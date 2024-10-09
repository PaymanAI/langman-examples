# LangMan Examples (Payman + LangGraph AI Agent)

This repository contains various examples demonstrating how AI agents can interact with and pay humans to complete tasks using LangGraph for AI Agent development and Payman for handling payments and task creation.

## Overview

The `LangMan Examples` repository provides multiple examples to help developers understand how to integrate LangGraph and Payman. Each example showcases a different use case or integration pattern.

## Examples

- **[LangMan-Simple](examples/langman-simple/)**: Demonstrates a basic AI agent setup using LangGraph and Payman to automate task creation and payment processes.
- **[LangMan-Webhook](examples/langman-webhook/)** (coming soon): Shows how to integrate webhooks for asynchronous updates and task verification.
- _(More examples will be added in the future)_

## Features

- Create AI-driven workflows using LangGraph
- Pay humans for services and tasks via Payman
- Automate task creation, payment processing, and AI-human collaboration
- Provide multiple examples to illustrate different integration scenarios

## Prerequisites

Before using any of the examples, ensure you have the following installed:

- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

Additionally, you'll need:

- OpenAI API key
- Payman API key

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PaymanAI/langman-examples.git
   ```

   ```bash
   cd langman-examples
   ```

2. **Choose an example to get started:**
   Navigate to the desired example directory, such as `examples/langman-simple`.

   ```bash
   cd examples/langman-simple
   ```

3. **Install dependencies:**

   ```bash
   bun install
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your OpenAI and Payman API keys in the `.env` file

## Example-Specific Instructions

Each example has its own README file containing detailed setup instructions and usage guidelines. Please refer to the individual README files for further information:

- [LangMan-Simple README](examples/langman-simple/README.md)

## Repository Structure

```
langman-examples/
├── examples/
│   ├── langman-simple/
│   │   ├── src/
│   │   ├── .env.example
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── langman-webhook/
│   │   ├── src/
│   │   ├── .env.example
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── package.json
│   │   └── tsconfig.json
├── .gitignore
├── README.md
├── LICENSE
├── biome.json
└── package.json
```

## Contributing

Contributions are welcome! If you would like to add a new example or improve an existing one, please feel free to submit a pull request.

## License

[MIT License](LICENSE)

## Acknowledgements

- [LangGraph](https://github.com/langchain-ai/langgraph) for AI workflow management
- [Payman](https://paymanai.com) for task creation and payment processing
- [OpenAI](https://openai.com) for the language model

## Support

For any questions or issues, please open an issue in the GitHub repository or contact the maintainers directly.
