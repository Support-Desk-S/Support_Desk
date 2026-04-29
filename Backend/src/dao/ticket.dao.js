import Ticket from "../models/ticket.model.js";

/**
 * Create a new ticket
 *
 * @param {Object} data - Ticket data {tenantId, customerEmail, subject}
 * @returns {Promise<Object>} - Created ticket object
 *
 * @description
 * - Creates a new ticket with default status 'open'
 * - tenantId must be provided for multi-tenant isolation
 */
export const createTicket = async (data) => {
  const ticket = await Ticket.create({
    tenantId: data.tenantId,
    customerEmail: data.customerEmail,
    subject: data.subject,
    status: "open",
  });

  return ticket;
};

/**
 * Get tickets with filtering and pagination
 *
 * @param {Object} filter - Query filter {tenantId, status, assignedTo}
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Number of records per page
 * @returns {Promise<Object>} - {tickets, total, page, totalPages}
 *
 * @description
 * - Retrieves tickets based on filter criteria
 * - Supports pagination for performance
 * - Sorts by createdAt in descending order
 */
export const getTickets = async (filter, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const tickets = await Ticket.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Ticket.countDocuments(filter);

  return {
    tickets,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Count tickets by status for a specific tenant
 *
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @param {string} status - Ticket status ('open', 'assigned', 'resolved')
 * @returns {Promise<number>} - Count of tickets with specified status
 *
 * @description
 * - Used by admin dashboard for statistics
 * - Filters by both tenantId and status
 */
export const countTicketsByStatus = async (tenantId, status) => {
  return await Ticket.countDocuments({ tenantId, status });
};

/**
 * Count all tickets for a specific tenant
 *
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<number>} - Total count of tickets
 *
 * @description
 * - Used by admin dashboard to get total ticket count
 * - Ensures multi-tenant isolation by filtering with tenantId
 */
export const countTicketsByTenant = async (tenantId) => {
  return await Ticket.countDocuments({ tenantId });
};
