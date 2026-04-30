import { MistralAIEmbeddings }  from "@langchain/mistralai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { config } from "../config/config.js";

const embeddings = new MistralAIEmbeddings({
  apiKey: config.MISTRAL_KEY,
  model: "mistral-embed",
});

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 900,
  chunkOverlap: 150,

  separators: [
    "\n\n",   // paragraphs (most important)
    "\n",     // lines
    ".",      // sentences
    "?",      // questions (important for FAQs)
    "!",      
    " ",      // words
    ""        // fallback
  ],
});

export async function getEmbeddings(text) {
    const chunks = await textSplitter.createDocuments([text]);
    const chunkTexts = chunks.map(chunk => chunk.pageContent);
    const docWithEmbeddings = await Promise.all(chunkTexts.map(async (chunk, index) => {
        const embedding = await embeddings.embedQuery(chunk);
        return {
          chunk,
          embedding,
        }
    }));
  
    return docWithEmbeddings;
}