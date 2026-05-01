import * as ticketDAO from "../dao/ticket.dao.js";
import AppError from "../utils/appError.js";

/**
 * Create a new ticket
 *
 * @param {Object} data - Ticket data {customerEmail, subject}
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<Object>} - Created ticket object
 */
export const createTicket = async (data, tenantId) => {
  const ticket = await ticketDAO.createTicket({
    tenantId,
    customerEmail: data.customerEmail,
    subject: data.subject,
  });

  return ticket;
};

/**
 * Get tickets with filtering and pagination
 *
 * @param {Object} query - Query parameters {status, assigned, page, limit}
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @param {string} userRole - User role (e.g., 'admin', 'agent', 'customer')
 * @param {string} userId - MongoDB ObjectId of the user (for agent filtering)
 * @returns {Promise<Object>} - {tickets, total, page, totalPages}
 */
export const getTickets = async (query, tenantId, userRole, userId) => {
  const filter = {
    tenantId,
  };

  // Filter by status
  if (query.status) {
    filter.status = query.status;
  }

  // Role-based logic
  if (userRole === "agent") {
    filter.assignedTo = userId;
  }

  if (query.assigned === "me") {
    filter.assignedTo = userId;
  }

  // Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const result = await ticketDAO.getTickets(filter, page, limit);

  return result;
};

/**
 * Get a single ticket by ID (tenant-scoped)
 *
 * @param {string} ticketId - MongoDB ObjectId of the ticket
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<Object>} - Ticket object with agent info
 */
export const getTicketById = async (ticketId, tenantId) => {
  const ticket = await ticketDAO.getTicketById(ticketId, tenantId);
  return ticket;
};

/**
 * Update ticket status (agent/admin)
 *
 * @param {string} ticketId - MongoDB ObjectId of the ticket
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @param {string} status - New status
 * @param {string} userId - The requesting user's ID
 * @param {string} userRole - The requesting user's role
 * @returns {Promise<Object>} - Updated ticket
 */
export const updateTicketStatus = async (ticketId, tenantId, status, userId, userRole) => {
  // Agents can only update tickets assigned to them
  if (userRole === 'agent') {
    const ticket = await ticketDAO.getTicketById(ticketId, tenantId);
    if (!ticket) throw new AppError('Ticket not found', 404);
    if (String(ticket.assignedTo?._id || ticket.assignedTo) !== String(userId)) {
      throw new AppError('You can only update tickets assigned to you', 403);
    }
  }

  const updated = await ticketDAO.updateTicketStatus(ticketId, tenantId, status);
  if (!updated) throw new AppError('Ticket not found', 404);
  return updated;
};

/**
 * Reassign a ticket to a different agent (admin only)
 *
 * @param {string} ticketId - MongoDB ObjectId of the ticket
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @param {string} agentId - MongoDB ObjectId of the agent
 * @returns {Promise<Object>} - Updated ticket
 */
export const assignTicket = async (ticketId, tenantId, agentId) => {
  const updated = await ticketDAO.assignTicket(ticketId, tenantId, agentId);
  if (!updated) throw new AppError('Ticket not found', 404);
  return updated;
};