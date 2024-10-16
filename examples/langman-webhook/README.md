# LangMan-Webhook (Payman + Langgraph AI Agent)

LangMan-Webhook is an AI agent that demonstrates how an AI can interact with and pay humans to complete tasks, incorporating a webhook for task completion feedback. It combines the power of Langgraph for abstracting workflows as programmatic AI Agents and Payman for handling payments and task creation.

## Features

- Create AI-driven workflows using Langgraph
- Pay humans for tasks the AI needs using Payman
- Automate task creation and payment processes
- Use webhooks to receive task completion feedback

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- [ngrok](https://ngrok.com/) - For exposing your local server to the internet

You'll also need:

- OpenAI API key
- Payman API key

## Installation

1. Clone the repository:

```
git clone https://github.com/PaymanAI/langman-webhook.git
cd langman-webhook
```

2. Install dependencies:

```
bun install
```

3. Set up environment variables:

- Copy `.env.example` to `.env`
- Fill in your OpenAI and Payman API keys in the `.env` file

## Configuration

To use Payman:

1. Go to [app.paymanai.com](https://app.paymanai.com)
2. Create a wallet
3. Add funds to your wallet
4. Generate an API key
5. Add the API key to your `.env` file

## Quick Start

To quickly get started and create your first task:

1. Start the development server:

```
bun dev
```

2. In a new terminal window, start ngrok to expose your local server:

```
ngrok http 3000
```

3. Copy the ngrok URL (e.g., `https://your-ngrok-url.ngrok.io`) and set it as the webhook URL in your Payman dashboard.

4. Open the `server.ts` file and locate the following section:

```typescript
new HumanMessage(
  "Get Tyllen (tyllen@paymanai.com) to plan an event for me. It's for 50 people and I want it to be a surprise party. I want it to be at a restaurant and I want to spend $50. I want it to be on a Saturday night. Make a made up itinerary for him and have him do it for us. Go for it!"
);
```

Replace `tyllen@paymanai.com` with your own email address. This ensures that you'll receive the task assignment.

5. Use curl to initiate a new conversation and create a task:

```
curl -X POST http://localhost:3000/start
```

This will start a new conversation thread and instruct the AI to create a task using the Payman API. The response will include a `thread_id` which you can use for further interactions.

6. Check your email for the task assignment. Complete the task as requested on the Payman platform.

7. Once you've completed the task, the webhook will be triggered. You should see console output in your terminal where the server is running, showing the result of the webhook processing.

8. (Optional) To continue the conversation or check the status, use:

```
curl -X GET http://localhost:3000/message/{thread_id}
```

Replace `{thread_id}` with the ID received from step 5.

This process allows you to test the full flow of task creation, assignment, completion, and webhook processing.

## Usage

To run the project in development mode:

```
bun dev
```

The server will start, and you can interact with the AI agent through the defined endpoints.

## API Endpoints

- `POST /start`: Initiates a new conversation thread with the AI agent
- `POST /message/:id`: Sends a message to an existing conversation thread
- `GET /message/:id`: Retrieves the current state of a conversation thread
- `POST /webhook`: Receives webhook notifications from Payman about task completions

## Project Structure

- `server.ts`: Main server file with API endpoints
- `graph.ts`: Defines the Langgraph workflow
- `tools.ts`: Contains the Payman task creation tool
- `model.ts`: Configures the language model (currently using OpenAI, feel free to use others like Anthropic, etc.)
- `state.ts`: Defines the state management for the application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Acknowledgements

- [Langgraph](https://github.com/langchain-ai/langgraph) for AI workflow management
- [Payman](https://paymanai.com) for task creation and payment processing
- [OpenAI](https://openai.com) for the language model
- [ngrok](https://ngrok.com/) for exposing local servers to the internet

## Support

For any questions or issues, please open an issue in the GitHub repository or contact the maintainers directly.
