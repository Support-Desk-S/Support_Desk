import * as ticketService from "../service/ticket.service.js";

export const createTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.createTicket(
      req.body,
      req.user
    );

    res.status(201).json({
      success: true,
      message: "Ticket created",
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
};

export const getTickets = async (req, res, next) => {
  try {
    const result = await ticketService.getTickets(
      req.query,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Tickets fetched",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};