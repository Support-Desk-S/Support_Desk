import axios from 'axios';

// We create a fresh axios instance for the widget that doesn't rely on JWTs or tenant slugs
const createWidgetApi = (apiKey) => {
  return axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
  });
};

export const getWidgetConfigApi = (apiKey) =>
  createWidgetApi(apiKey).get('/api/messages/widget-config');

export const sendInitialMessageApi = (apiKey, data) =>
  createWidgetApi(apiKey).post('/api/messages/send', data);

export const sendFollowupMessageApi = (apiKey, ticketId, message) =>
  createWidgetApi(apiKey).post(`/api/messages/ticket/${ticketId}`, { message });

export const getTicketMessagesApi = (apiKey, ticketId) =>
  createWidgetApi(apiKey).get(`/api/messages/${ticketId}`);
