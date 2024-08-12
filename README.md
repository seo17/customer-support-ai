# AI Customer Support Chatbot

This project is an AI-powered customer support chatbot designed to respond to user queries intelligently using OpenAI models. The application is built with Next.js, styled with Tailwind CSS, and utilizes Redux for state management. The project also integrates LangChain to implement Retrieval-Augmented Generation (RAG), enabling the chatbot to provide responses based on a predefined knowledge base.

## Features

- **Basic Chatbot**: A simple chatbot that interacts with users.
- **Intelligent Responses**: Utilizes OpenAI models to generate meaningful and context-aware responses.
- **Deployment**: Deploy the web application to AWS EC2 Servers and Vercel for scalable hosting.
- **RAG Implementation**: Incorporates Retrieval-Augmented Generation to enhance response accuracy based on a given knowledge base.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **State Management**: Redux
- **AI/ML**: OpenAI API, LangChain
- **Deployment**: AWS EC2, Vercel

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/seo17/samuel-owolabi.git
   cd samuel-owolabi/AI-Customer-Support-Chatbot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file in the root directory and adding your OpenAI API key and other necessary configurations.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Build and deploy the app to AWS EC2 Servers or Vercel as per your preference.

## Usage

- Interact with the chatbot by asking questions or making requests.
- The chatbot will generate responses using the integrated OpenAI model.
- If RAG is implemented, the chatbot will also use the provided knowledge base to refine its responses.
