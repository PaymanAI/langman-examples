import { Elysia, t } from "elysia";
import { v4 as uuidv4 } from "uuid";
import { app, graph } from "./graph";
import { HumanMessage } from "@langchain/core/messages";

export const server = new Elysia()
  .post("/start", async () => {
    const thread_id = uuidv4();
    const result = await app.invoke(
      {
        messages: [
          new HumanMessage(
            "Get Tyllen (tyllen@paymanai.com) to plan an event for me. It's for 50 people and I want it to be a surprise party. I want it to be at a restaurant and I want to spend $50. I want it to be on a Saturday night. Make a made up itenerary for him and have him do it for us. Go for it!"
          ),
        ],
      },
      { configurable: { thread_id } }
    );

    return {
      state: result,
      thread_id,
    };
  })
  .post(
    "/message/:id",
    async ({ body: { message }, params: { id } }) => {
      const config = { configurable: { thread_id: id } };
      await graph.updateState(config, { messages: [message] }); //add `asNode: "wait_for_input"` to update as a graph node

      return {
        state: await graph.getState(config),
        id,
      };
    },
    {
      body: t.Object({
        message: t.String(),
      }),
    }
  )
  .get("/message/:id", async ({ params: { id } }) => {
    const config = { configurable: { thread_id: id } };
    return {
      state: await graph.getState(config),
      id,
    };
  });
