import express from "express";
import { apiKeyMiddleware } from "../middleware/apiKey.middleware.js";
import * as messageController from "../controllers/message.controller.js";
import {
  sendMessageValidation,
  getMessagesValidation,
} from "../validation/message.validation.js";

const router = express.Router();

/**
 * @route POST /api/messages/send
 * @desc Send a customer message via chat widget - AI will respond or create ticket
 * @access Public (requires API Key)
 * @header {string} X-API-Key - Chat Widget API Key
 * @body {string} message - Customer's message
 * @body {string} customerEmail - Customer email address
 * @body {string} apiKey - Alternative to header (optional)
 */
router.post(
  "/send",
  apiKeyMiddleware,
  sendMessageValidation,
  messageController.sendMessage
);

/**
 * @route POST /api/messages/ticket/:ticketId
 * @desc Add a message to an existing ticket
 * @access Public (requires API Key)
 * @header {string} X-API-Key - Chat Widget API Key
 * @params {string} ticketId - Ticket ID
 * @body {string} message - Message content
 */
router.post(
  "/ticket/:ticketId",
  apiKeyMiddleware,
  messageController.addMessageToTicket
);

/**
 * @route GET /api/messages/:ticketId
 * @desc Get all messages for a ticket
 * @access Public (requires API Key)
 * @header {string} X-API-Key - Chat Widget API Key
 * @params {string} ticketId - Ticket ID
 * @query {number} page - Page number (default: 1)
 * @query {number} limit - Messages per page (default: 50, max: 100)
 */
router.get("/:ticketId", apiKeyMiddleware, messageController.getTicketMessages);

/**
 * @route POST /api/messages/kb-query
 * @desc Query knowledge base directly
 * @access Public (requires API Key)
 * @header {string} X-API-Key - Chat Widget API Key
 * @body {string} query - Search query
 * @body {number} topK - Number of results (default: 5)
 */
router.post(
  "/kb-query",
  apiKeyMiddleware,
  messageController.queryKnowledgeBase
);

export default router;
