import { StateGraph } from "@langchain/langgraph";
import StateAnnotation from "./state";
import { model } from "./model";
import { MemorySaver } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import { createTaskTool } from "./tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";

export const graph = new StateGraph(StateAnnotation).compile();

const tools = [createTaskTool];
const toolNodeForGraph = new ToolNode(tools);

async function callModel(state: typeof StateAnnotation.State) {
  const messages = state.messages;
  const response = await model.invoke(messages);

  // We return a list, because this will get added to the existing list
  return { messages: [response] };
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

const workflow = new StateGraph(StateAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNodeForGraph)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", checkToolCall, ["tools", "__end__"])
  .addEdge("tools", "agent");

const checkpointer = new MemorySaver();

export const app = workflow.compile({ checkpointer });
