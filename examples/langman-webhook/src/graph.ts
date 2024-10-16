import { StateGraph } from "@langchain/langgraph";
import StateAnnotation from "./state";
import { model } from "./model";
import { MemorySaver } from "@langchain/langgraph";
import { AIMessage, ToolMessage } from "@langchain/core/messages";
import { generateTools } from "./tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";

async function callModel(state: typeof StateAnnotation.State) {
  const messages = state.messages;
  const tools = generateTools();
  const modelWithTools = model.bindTools(tools);
  const response = await modelWithTools.invoke(messages);

  // We return a list, because this will get added to the existing list
  return { messages: [response] };
}

async function ToolNodeWithGraphState(state: typeof StateAnnotation.State) {
  const tools = generateTools();
  const toolNodeWithConfig = new ToolNode(tools);
  return toolNodeWithConfig.invoke(state);
}

function checkToolCall(state: typeof StateAnnotation.State) {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1] as AIMessage;
  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }
  // Otherwise, we stop (reply to the user)
  return "__end__";
}

function checkToolResponse(state: typeof StateAnnotation.State) {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1] as ToolMessage;

  const content = lastMessage.content as string;

  if (content.includes("HTTP Error")) {
    //if error sends back to AI Agent, but could also send to another node that better handles the error
    return "agent";
  }

  console.log("WAITING FOR WEBHOOK");
  state.waitingForWebhook = true;
  // console.log("State", state);
  return "waitForWebhook";
}

const workflow = new StateGraph(StateAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", ToolNodeWithGraphState)
  .addNode("waitForWebhook", async () => {})
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", checkToolCall, ["tools", "__end__"])
  .addConditionalEdges("tools", checkToolResponse, ["waitForWebhook", "agent"])
  .addEdge("waitForWebhook", "agent");

const checkpointer = new MemorySaver();

export const app = workflow.compile({
  checkpointer,
  interruptBefore: ["waitForWebhook"],
});
