import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "../config/config.js";
import { index } from "../config/vectorDb.js";
import { getEmbeddings } from "../utils/getEmbeddings.js";
import * as messageDAO from "../dao/message.dao.js";
import * as ticketDAO from "../dao/ticket.dao.js";
import AppError from "../utils/appError.js";

const mistralChat = new ChatMistralAI({
  apiKey: config.MISTRAL_KEY,
  model: "mistral-large-latest",
  temperature: 0.7,
});

/**
 * Process customer message and generate AI response or create ticket
 *
 * @param {string} customerMessage - The customer's message
 * @param {string} customerEmail - Customer email
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<Object>} - {response, ticketId, isTicketCreated, message}
 *
 * @description
 * - Gets embeddings for the customer message
 * - Queries vector DB for similar documents
 * - If relevant data found → generates AI response
 * - If no relevant data → creates ticket and assigns to available agent
 */
export const processCustomerMessage = async (
  customerMessage,
  customerEmail,
  tenantId
) => {
  try {
    // Step 1: Get embeddings for the customer message
    const embeddingsData = await getEmbeddings(customerMessage);

    if (!embeddingsData || embeddingsData.length === 0) {
      throw new AppError("Failed to generate embeddings", 500);
    }

    // Use the first embedding (main query)
    const messageEmbedding = embeddingsData[0].embedding;

    // Step 2: Query vector DB for similar documents
    const searchResults = await index.query({
      vector: messageEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    // Check if we found relevant data (similarity threshold)
    const SIMILARITY_THRESHOLD = 0.6;
    const relevantResults = searchResults.matches.filter(
      (match) => match.score >= SIMILARITY_THRESHOLD
    );

    // Step 3: If relevant data found, generate AI response
    if (relevantResults.length > 0) {
      const contextData = relevantResults
        .map((match) => match.metadata?.text || "")
        .join("\n\n");

      const aiPrompt = `You are a helpful support agent. Based on the following knowledge base information, answer the customer's question concisely and helpfully.

Knowledge Base:
${contextData}

Customer Question:
${customerMessage}

Provide a clear and concise answer based on the knowledge base information.`;

      const aiResponse = await mistralChat.invoke([
        {
          role: "user",
          content: aiPrompt,
        },
      ]);

      const responseText =
        aiResponse.content || "I apologize, but I couldn't generate a response.";

      return {
        success: true,
        isTicketCreated: false,
        response: responseText,
        message: "Query resolved from knowledge base",
        confidence: relevantResults[0].score,
      };
    }

    // Step 4: No relevant data found - create ticket and assign to agent
    const ticket = await ticketDAO.createTicket({
      tenantId,
      customerEmail,
      subject: customerMessage.substring(0, 200), // Use first 200 chars as subject
    });

    // Get available agent (with least assigned tickets)
    const availableAgent = await messageDAO.getAvailableAgent(tenantId);

    if (availableAgent) {
      // Assign ticket to agent
      await messageDAO.updateTicket(ticket._id, {
        assignedTo: availableAgent._id,
        status: "assigned",
      });

      // Create AI notification message
      const notificationMessage = `Thank you for reaching out. Your query requires human attention and has been assigned to our support team. An agent will respond shortly.`;

      return {
        success: true,
        isTicketCreated: true,
        ticketId: ticket._id,
        assignedAgentId: availableAgent._id,
        assignedAgentName: availableAgent.name,
        response: notificationMessage,
        message: "Ticket created and assigned to nearest available agent",
      };
    } else {
      // No agents available, but still create ticket
      const notificationMessage = `Thank you for reaching out. Your query has been recorded and will be addressed by our support team as soon as an agent becomes available.`;

      return {
        success: true,
        isTicketCreated: true,
        ticketId: ticket._id,
        assignedAgentId: null,
        response: notificationMessage,
        message: "Ticket created. No agents currently available.",
      };
    }
  } catch (error) {
    console.error("Error in processCustomerMessage:", error);
    throw error;
  }
};

/**
 * Generate AI response for a message (for existing tickets)
 *
 * @param {string} message - The message content
 * @param {Array} conversationContext - Previous messages for context
 * @returns {Promise<string>} - AI generated response
 */
export const generateAIResponse = async (message, conversationContext = []) => {
  try {
    const contextString = conversationContext
      .slice(-5)
      .map((msg) => `${msg.sender}: ${msg.message}`)
      .join("\n");

    const prompt = `You are a helpful support agent. Here is the conversation context:

${contextString}

Customer: ${message}

Provide a helpful response.`;

    const aiResponse = await mistralChat.invoke([
      {
        role: "user",
        content: prompt,
      },
    ]);

    return aiResponse.content || "I apologize for the inconvenience.";
  } catch (error) {
    console.error("Error in generateAIResponse:", error);
    throw error;
  }
};

/**
 * Query vector DB with a query string
 *
 * @param {string} query - The search query
 * @param {number} topK - Number of top results to return
 * @returns {Promise<Array>} - Array of matching documents with metadata
 */
export const queryVectorDB = async (query, topK = 5) => {
  try {
    const embeddingsData = await getEmbeddings(query);

    if (!embeddingsData || embeddingsData.length === 0) {
      throw new AppError("Failed to generate embeddings", 500);
    }

    const queryEmbedding = embeddingsData[0].embedding;

    const results = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    return results.matches;
  } catch (error) {
    console.error("Error in queryVectorDB:", error);
    throw error;
  }
};
