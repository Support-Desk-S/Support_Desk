import axiosInstance from '../../../lib/axios';

export const getTicketsApi = (params) =>
  axiosInstance.get('/api/tickets', { params });

export const getTicketMessagesApi = (ticketId) =>
  axiosInstance.get(`/api/tickets/${ticketId}/messages`);

export const createTicketApi = (data) =>
  axiosInstance.post('/api/tickets', data);
