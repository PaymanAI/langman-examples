# LangMan-Simple (Payman + Langgraph AI Agent)

LangMan-Simple is an AI agent that demonstrates how an AI can interact with and pay humans to complete tasks. It combines the power of Langgraph for abstracting workflows as programmatic AI Agents and Payman for handling payments and task creation.

## Features

- Create AI-driven workflows using Langgraph
- Pay humans for things the AI needs using Payman
- Automate task creation and payment processes
- Demonstrate AI-human collaboration in a simple, understandable way

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime

You'll also need:

- OpenAI API key
- Payman API key

## Installation

1. Clone the repository:

```
git clone https://github.com/PaymanAI/langman-simple.git
```

```
cd langman-simple
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

2. In a new terminal window, use curl to initiate a new conversation and create a task:
   
```
curl -X POST http://localhost:3000/start
```

This will start a new conversation thread and instruct the AI to create a task using the Payman API. The response will include a `thread_id` which you can use for further interactions.

3. (Optional) To continue the conversation or check the status, use:
   
```
curl -X GET http://localhost:3000/message/{thread_id}
```

Replace `{thread_id}` with the ID received from the previous step.

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

## Project Structure

- `server.ts`: Main server file with API endpoints
- `graph.ts`: Defines the Langgraph workflow
- `tools.ts`: Contains the Payman task creation tool
- `model.ts`: Configures the language model (currently using OpenAI, feel free to use others like Anthropics, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Acknowledgements

- [Langgraph](https://github.com/langchain-ai/langgraph) for AI workflow management
- [Payman](https://paymanai.com) for task creation and payment processing
- [OpenAI](https://openai.com) for the language model

## Support

For any questions or issues, please open an issue in the GitHub repository or contact the maintainers directly.
