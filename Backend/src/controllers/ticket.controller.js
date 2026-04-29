import * as ticketService from "../service/ticket.service.js";
import AppError from "../utils/appError.js";

export const createTicket = async (req, res) => {
  try {
    const { tenantId } = req.user;

    const ticket = await ticketService.createTicket(
      req.body,
      tenantId
    );

    return res.status(201).json({
      success: true,
      message: "Ticket created",
      data: ticket,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    console.error("Error in createTicket:", err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    const { tenantId, role, id: userId } = req.user;

    const result = await ticketService.getTickets(
      req.query,
      tenantId,
      role,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Tickets fetched",
      data: result,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }
    console.error("Error in getTickets:", err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};