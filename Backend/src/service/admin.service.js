import AppError from "../utils/appError.js";
import * as userDAO from "../dao/user.dao.js";
import * as ticketDAO from "../dao/ticket.dao.js";

/**
 * Get all users in a tenant
 *
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<Array>} - List of users excluding password
 */
export const getUsers = async (tenantId) => {
  return await userDAO.getUsersByTenant(tenantId);
};

/**
 * Approve or reject a user
 *
 * @param {string} userId - MongoDB ObjectId of the user
 * @param {boolean} isApproved - Approval status
 * @param {string} tenantId - MongoDB ObjectId of the tenant (for security check)
 * @returns {Promise<Object>} - Updated user object
 */
export const approveUser = async (userId, isApproved, tenantId) => {
  const user = await userDAO.getUserByIdAndTenant(userId, tenantId);

  if (!user) throw new AppError("User not found", 404);

  if (user.role === "admin") {
    throw new AppError("Cannot approve another admin", 403);
  }

  if (user.isApproved === true) {
    throw new AppError("User already approved", 400);
  }

  user.isApproved = isApproved;
  await user.save();

  return user;
};

/**
 * Update user role
 *
 * @param {string} userId - MongoDB ObjectId of the user
 * @param {string} role - New role for the user
 * @param {string} tenantId - MongoDB ObjectId of the tenant (for security check)
 * @param {string} adminId - MongoDB ObjectId of the admin making the change (prevents self-role change)
 * @returns {Promise<Object>} - Updated user object
 */
export const updateUserRole = async (userId, role, tenantId, adminId) => {
  if (adminId === userId) {
    throw new AppError("Cannot change your own role", 403);
  }

  const user = await userDAO.getUserByIdAndTenant(userId, tenantId);

  if (!user) throw new AppError("User not found", 404);

  user.role = role;

  if (role === "agent") {
    user.isApproved = false;
  }

  await user.save();

  return user;
};

/**
 * Get dashboard statistics for a tenant
 *
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<Object>} - Dashboard statistics
 */
export const getStats = async (tenantId) => {
  const totalTickets = await ticketDAO.countTicketsByTenant(tenantId);
  const openTickets = await ticketDAO.countTicketsByStatus(tenantId, "open");
  const assignedTickets = await ticketDAO.countTicketsByStatus(tenantId, "assigned");
  const resolvedTickets = await ticketDAO.countTicketsByStatus(tenantId, "resolved");

  const totalAgents = await userDAO.countUsersByTenantAndRole(tenantId, "agent");
  const approvedAgents = await userDAO.countUsersByTenantRoleAndApproval(tenantId, "agent", true);

  const pendingApproval = totalAgents - approvedAgents;

  const resolutionRate =
    totalTickets === 0
      ? 0
      : (resolvedTickets / totalTickets) * 100;

  return {
    totalTickets,
    openTickets,
    assignedTickets,
    resolvedTickets,
    totalAgents,
    approvedAgents,
    pendingApproval,
    resolutionRate,
  };
};