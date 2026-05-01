import axiosInstance from '../../../lib/axios';

export const getTicketsApi = (params) =>
  axiosInstance.get('/api/tickets', { params });

export const getTicketByIdApi = (ticketId) =>
  axiosInstance.get(`/api/tickets/${ticketId}`);

export const updateTicketStatusApi = (ticketId, status) =>
  axiosInstance.patch(`/api/tickets/${ticketId}/status`, { status });

export const assignTicketApi = (ticketId, agentId) =>
  axiosInstance.patch(`/api/tickets/${ticketId}/assign`, { agentId });

export const getAgentMessagesApi = (ticketId) =>
  axiosInstance.get(`/api/messages/agent/${ticketId}`);

export const agentReplyApi = (ticketId, message) =>
  axiosInstance.post(`/api/messages/agent/reply/${ticketId}`, { message });

export const getAISuggestionApi = (ticketId) =>
  axiosInstance.post(`/api/messages/agent/ai-suggest/${ticketId}`);

export const createTicketApi = (data) =>
  axiosInstance.post('/api/tickets', data);
