import User from "../models/user.model.js";
import Ticket from "../models/ticket.model.js";
import AppError from "../utils/appError.js";

// Get all users in tenant
export const getUsers = async (admin) => {
  return await User.find({ tenantId: admin.tenantId }).select("-password");
};

// Approve or reject user
export const approveUser = async (userId, isApproved, admin) => {
  const user = await User.findOne({
    _id: userId,
    tenantId: admin.tenantId,
  });

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

// Update user role
export const updateUserRole = async (userId, role, admin) => {
  if (admin.id === userId) {
    throw new AppError("Cannot change your own role", 403);
  }

  const user = await User.findOne({
    _id: userId,
    tenantId: admin.tenantId,
  });

  if (!user) throw new AppError("User not found", 404);

  user.role = role;

  if (role === "agent") {
    user.isApproved = false;
  }

  await user.save();

  return user;
};

// Get dashboard stats
export const getStats = async (tenantId) => {
  const totalTickets = await Ticket.countDocuments({ tenantId });
  const openTickets = await Ticket.countDocuments({
    tenantId,
    status: "open",
  });
  const assignedTickets = await Ticket.countDocuments({
    tenantId,
    status: "assigned",
  });
  const resolvedTickets = await Ticket.countDocuments({
    tenantId,
    status: "resolved",
  });

  const totalAgents = await User.countDocuments({
    tenantId,
    role: "agent",
  });

  const approvedAgents = await User.countDocuments({
    tenantId,
    role: "agent",
    isApproved: true,
  });

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