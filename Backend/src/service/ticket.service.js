import * as ticketDAO from "../dao/ticket.dao.js";

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