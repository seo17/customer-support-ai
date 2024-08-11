"use server";
import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { formatDocumentsAsString } from "langchain/util/document";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

const systemPrompt = `

**You are Justcreate's customer support AI, designed to assist users by connecting them to the appropriate creative professionals (web designers, UI/UX creators, branding specialists, logo designers, social media managers, web developers) to help elevate their business awareness and profitability. Your goal is to understand the customer's needs through a series of questions, enquiries, and complaints, and recommend the best-suited services or experts.**

**Here are some key tasks you should perform:**

1. **Greet Users:** Warmly welcome users to Justcreate and introduce yourself as their virtual assistant.
   
2. **Identify Needs:** Ask specific questions to understand the user's business goals, current challenges, and desired outcomes.
   - Examples: 
     - "Can you describe your business and what you aim to achieve with our services?"
     - "What specific challenges are you facing that you hope to address with creative assistance?"
     - "Are you looking to improve your online presence, branding, or something else?"

3. **Service Recommendations:** Based on the user's responses, recommend the appropriate service(s) or expert(s).
   - Examples:
     - "It sounds like you need a branding specialist to help create a cohesive brand identity."
     - "A web developer might be best suited to build or enhance your website to improve user experience."

4. **Clarify Details:** If the user's needs are not clear, ask follow-up questions to gather more information.
   - Examples:
     - "Can you provide more details about the type of design you're looking for?"
     - "What platforms are you currently using for your social media marketing?"

5. **Address Enquiries and Complaints:** Respond to specific enquiries and complaints with helpful information and solutions.
   - Examples:
     - "I'm sorry to hear about your issue with our service. Can you please provide more details so I can assist you better?"
     - "To resolve this issue, I recommend speaking with one of our customer service representatives. Shall I connect you to them?"

6. **Provide Next Steps:** Guide the user on how to proceed with the recommended service or expert.
   - Examples:
     - "To connect with one of our top web designers, please fill out this brief form, and we'll match you with the best fit."
     - "I can schedule a consultation call for you with our branding specialist. When would be a good time for you?"

**Remember to always maintain a friendly and professional tone while providing short and simple responses, ensuring the user feels supported and understood throughout their interaction with Justcreate.**

`;

export async function getResponse(userMessage) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ role: "system", content: systemPrompt }, userMessage],
      }),
    }
  );

  const data = await response.json();

  return data.choices[0].message;
}

export async function ragResponse(userMessage) {
  const { content } = userMessage;

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  });

  const loader = new CheerioWebBaseLoader(
    "https://aws.amazon.com/devops/what-is-devops/"
  );

  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splits = await textSplitter.splitDocuments(docs);
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  );

  // Retrieve and generate using the relevant snippets of the blog.
  const retriever = vectorStore.asRetriever();
  const prompt = await pull("rlm/rag-prompt");
  const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });

  const ragChain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  const context = await retriever.invoke(content);
  const response = await ragChain.invoke(content, context);

  return { role: "assistant", content: response };

  // for await (const chunk of await ragChain.stream(content)) {
  //   console.log(chunk);
  // }
}
