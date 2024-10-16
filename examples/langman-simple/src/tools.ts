import axios from "axios";
import { z } from "zod";
import { tool } from "@langchain/core/tools";

// Define the task creation tool
export const createTaskTool = tool(
  async ({ title, description, email }) => {
    const headers = {
      "x-payman-api-secret": process.env.PAYMAN_API_SECRET, // Environment variable for API secret
      "Content-Type": "application/json",
      Accept: "application/vnd.payman.v1+json",
    };

    const payload = {
      title: title, // Task title (e.g., drink name)
      description: description, // Task description (e.g., how to make the drink)
      payout: 5000, // $50 payout in cents
      inviteEmails: [email], // List of emails to invite to complete the task
    };

    try {
      // Choose between sandbox or live environment based on environment variable
      const apiUrl: any = process.env.PAYMAN_DEV_API;

      // Make the API request
      const response = await axios.post(apiUrl, payload, { headers });

      // Return the response content upon success
      return `Task created successfully: ${response.data.title}`;
    } catch (error: any) {
      // Type assertion for error
      // Handle errors (HTTP errors or general exceptions)
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
      title: z
        .string()
        .describe(
          "The title of the task. Make it clear, concise, and to the point."
        ),
      description: z
        .string()
        .describe(
          "The description of the task. Be as detailed as possible as the human will use this to complete the task."
        ),
      email: z
        .string()
        .email()
        .describe("The email of the person to invite to complete the task."),
    }),
  }
);
