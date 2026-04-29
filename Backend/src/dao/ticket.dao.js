import Ticket from "../models/ticket.model.js";

/**
 * Count all tickets for a specific tenant
 *
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<number>} Total count of tickets
 *
 * @description
 * - Used by admin dashboard to get total ticket count
 * - Ensures multi-tenant isolation by filtering with tenantId
 */
export const countTicketsByTenant = async (tenantId) => {
  return await Ticket.countDocuments({ tenantId });
};

/**
 * Count tickets by status for a specific tenant
 *
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @param {string} status - Ticket status ('open', 'assigned', 'resolved')
 * @returns {Promise<number>} Count of tickets with specified status
 *
 * @description
 * - Used by admin dashboard for statistics
 * - Filters by both tenantId and status
 */
export const countTicketsByStatus = async (tenantId, status) => {
  return await Ticket.countDocuments({ tenantId, status });
};
