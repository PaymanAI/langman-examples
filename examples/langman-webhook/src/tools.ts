import axios from "axios";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { type LangGraphRunnableConfig } from "@langchain/langgraph";

export function generateTools() {
  const createTask = tool(
    async (input, config: LangGraphRunnableConfig) => {
      const { title, description, email } = input;
      const thread_id = config.configurable?.thread_id;

      const headers = {
        "x-payman-api-secret": process.env.PAYMAN_API_SECRET,
        "Content-Type": "application/json",
        Accept: "application/vnd.payman.v1+json",
      };

      const payload = {
        title: title,
        description: description,
        payout: 5000,
        metadata: {
          thread_id,
        },
        inviteEmails: [email],
      };

      try {
        const apiUrl: any = process.env.PAYMAN_DEV_API;
        const response = await axios.post(apiUrl, payload, { headers });

        return `Task created successfully: ${response.data.title}`;
      } catch (error: any) {
        if (error.response) {
          return `HTTP Error: ${error.response.status} - ${error.response.data.errorMessage}`;
        } else {
          return `Error: ${error.data}`;
        }
      }
    },
    {
      name: "createTask",
      description:
        "Create a new task on the Payman platform with a title, description, and invited email.",
      schema: z.object({
        title: z.string().describe("The title of the task."),
        description: z.string().describe("The description of the task."),
        email: z
          .string()
          .email()
          .describe("The email of the person to invite to complete the task."),
      }),
    }
  );
  return [createTask];
}
