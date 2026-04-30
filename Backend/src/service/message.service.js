import * as messageDAO from "../dao/message.dao.js";
import Ticket from "../models/ticket.model.js";
import AppError from "../utils/appError.js";

/**
 * Add a message to an existing ticket
 *
 * @param {string} ticketId - MongoDB ObjectId of the ticket
 * @param {string} messageContent - The message content
 * @param {string} sender - Who is sending ('customer', 'agent', 'ai')
 * @param {string} userId - MongoDB ObjectId of the user
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<Object>} - Created message object
 */
export const addMessageToTicket = async (
  ticketId,
  messageContent,
  sender,
  userId,
  tenantId
) => {
  try {
    // Verify ticket exists and belongs to tenant
    const ticket = await Ticket.findOne({
      _id: ticketId,
      tenantId,
    });

    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    // Create message
    const message = await messageDAO.createMessage({
      ticketId,
      sender,
      message: messageContent,
    });

    return message;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error in addMessageToTicket:", error);
    throw new AppError("Failed to add message", 500);
  }
};

/**
 * Get all messages for a specific ticket
 *
 * @param {string} ticketId - MongoDB ObjectId of the ticket
 * @param {number} page - Page number
 * @param {number} limit - Messages per page
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<Object>} - Messages and pagination info
 */
export const getTicketMessages = async (
  ticketId,
  page = 1,
  limit = 50,
  tenantId
) => {
  try {
    // Verify ticket exists and belongs to tenant
    const ticket = await Ticket.findOne({
      _id: ticketId,
      tenantId,
    });

    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }

    // Get messages
    const result = await messageDAO.getMessagesByTicketId(ticketId, page, limit);

    return result;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error in getTicketMessages:", error);
    throw new AppError("Failed to fetch messages", 500);
  }
};
