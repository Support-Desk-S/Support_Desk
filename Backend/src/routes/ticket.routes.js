import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import * as ticketController from "../controllers/ticket.controller.js";
import { createTicketValidation,getTicketsValidation  } from "../validation/ticket.validation.js";

const router = express.Router();

/**
 * @route POST /api/tickets
 * @desc Create ticket
 */
router.post(
  "/",
  authMiddleware,
  createTicketValidation,
  ticketController.createTicket
);

router.get(
  "/",
  authMiddleware,
  getTicketsValidation,
  ticketController.getTickets
);

export default router;