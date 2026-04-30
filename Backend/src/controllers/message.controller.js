import * as aiService from "../service/ai.service.js";
import * as messageService from "../service/message.service.js";
import AppError from "../utils/appError.js";

/**
 * @route POST /api/messages/send
 * @desc Send a message and get AI response or ticket creation
 * @access Public/Customer
 */
export const sendMessage = async (req, res) => {
  try {
    const { message, customerEmail } = req.body;
    const { tenantId } = req.user;

    if (!message || !customerEmail || !tenantId) {
      return res.status(400).json({
        success: false,
        message: "Message, customer email, and tenant ID are required",
      });
    }

    // Process the customer message
    const result = await aiService.processCustomerMessage(
      message,
      customerEmail,
      tenantId
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    console.error("Error in sendMessage:", err);
    return res.status(500).json({
      success: false,
      message: "Error processing message",
    });
  }
};

/**
 * @route POST /api/messages/ticket/:ticketId
 * @desc Add a message to an existing ticket
 * @access Private/Agent/Customer
 */
export const addMessageToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body;
    const { tenantId, role, id: userId } = req.user;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await messageService.addMessageToTicket(
      ticketId,
      message,
      role === "agent" ? "agent" : "customer",
      userId,
      tenantId
    );

    return res.status(200).json({
      success: true,
      data: result,
      message: "Message added successfully",
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    console.error("Error in addMessageToTicket:", err);
    return res.status(500).json({
      success: false,
      message: "Error adding message",
    });
  }
};

/**
 * @route GET /api/messages/:ticketId
 * @desc Get all messages for a ticket
 * @access Private/Agent/Customer
 */
export const getTicketMessages = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const { tenantId } = req.user;

    const result = await messageService.getTicketMessages(
      ticketId,
      parseInt(page),
      parseInt(limit),
      tenantId
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    console.error("Error in getTicketMessages:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching messages",
    });
  }
};

/**
 * @route POST /api/messages/kb-query
 * @desc Query knowledge base directly
 * @access Public/Testing
 */
export const queryKnowledgeBase = async (req, res) => {
  try {
    const { query, topK = 5 } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    const results = await aiService.queryVectorDB(query, topK);

    return res.status(200).json({
      success: true,
      data: results,
      message: "Knowledge base query completed",
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    console.error("Error in queryKnowledgeBase:", err);
    return res.status(500).json({
      success: false,
      message: "Error querying knowledge base",
    });
  }
};
