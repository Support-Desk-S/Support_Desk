import { MistralAIEmbeddings }  from "@langchain/mistralai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { config } from "../config/config.js";

const embeddings = new MistralAIEmbeddings({
  apiKey: config.MISTRAL_KEY,
  model: "mistral-embed",
});

/**
 * Optimized text splitter for FAQ and knowledge base documents
 * Reduced chunk size (500) for better semantic granularity
 * Increased overlap (200) to maintain context across chunks
 * Prioritizes FAQ structure with Q/A separators
 */
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,        // Reduced from 900 for better granularity
  chunkOverlap: 200,     // Increased from 150 for better context continuity

  separators: [
    "\n\nQ:",              // FAQ question marker (highest priority)
    "\n\nA:",              // FAQ answer marker
    "\n\n",               // Double newline paragraphs
    "\n",                 // Single newline
    "?",                  // Questions
    "!",                  // Exclamations
    ".",                  // Sentences
    " ",                  // Words
    ""                    // Fallback
  ],
});

/**
 * Generate embeddings for text with optimized chunking
 * @param {string} text - Text to embed (PDF content or FAQ)
 * @returns {Promise<Array>} Array of {chunk, embedding} objects
 * 
 * @description
 * - Splits text into semantic chunks optimized for FAQ retrieval
 * - Generates embeddings for each chunk using Mistral API
 * - Returns chunks with their embeddings for vector DB storage
 */
export async function getEmbeddings(text) {
    try {
      // Validate input
      if (!text || text.trim().length === 0) {
        throw new Error("Text input cannot be empty");
      }

      const chunks = await textSplitter.createDocuments([text]);
      
      // Log for debugging
      console.log(`[getEmbeddings] Input text length: ${text.length} chars`);
      console.log(`[getEmbeddings] Created ${chunks.length} chunks`);
      chunks.forEach((chunk, idx) => {
        console.log(`  Chunk ${idx + 1}: ${chunk.pageContent.length} chars`);
      });

      const chunkTexts = chunks.map(chunk => chunk.pageContent);
      
      const docWithEmbeddings = await Promise.all(
        chunkTexts.map(async (chunk, index) => {
          const embedding = await embeddings.embedQuery(chunk);
          return {
            chunk,
            embedding,
          };
        })
      );
  
      console.log(`[getEmbeddings] Successfully generated ${docWithEmbeddings.length} embeddings`);
      return docWithEmbeddings;
    } catch (err) {
      console.error("[getEmbeddings] Error:", err);
      throw err;
    }
}