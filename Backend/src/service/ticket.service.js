import Ticket from "../models/ticket.model.js";

export const createTicket = async (data, user) => {
  const ticket = await Ticket.create({
    tenantId: user.tenantId,   // 🔒 from JWT (not request)
    customerEmail: data.customerEmail,
    subject: data.subject,
    status: "open",
  });

  return ticket;
};

export const getTickets = async (query, user) => {
  const filter = {
    tenantId: user.tenantId,   // 🔒 tenant isolation
  };

  // 🎯 Filter by status
  if (query.status) {
    filter.status = query.status;
  }

  // 👤 Role-based logic
  if (user.role === "agent") {
    filter.assignedTo = user.id;
  }

  if (query.assigned === "me") {
    filter.assignedTo = user.id;
  }

  // 📄 Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

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