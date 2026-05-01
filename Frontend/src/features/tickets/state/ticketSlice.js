import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  total: 0,
  loading: false,
  activeFilter: 'all',
  // Active ticket detail
  activeTicket: null,
  activeTicketMessages: [],
  ticketDetailLoading: false,
  messagesLoading: false,
  sending: false,
  aiLoading: false,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = Array.isArray(action.payload.tickets) ? action.payload.tickets : [];
      state.total = action.payload.total ?? 0;
    },
    setTicketsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    // Ticket detail
    setActiveTicket: (state, action) => {
      state.activeTicket = action.payload;
    },
    setActiveTicketMessages: (state, action) => {
      state.activeTicketMessages = action.payload;
    },
    appendMessage: (state, action) => {
      state.activeTicketMessages.push(action.payload);
    },
    setTicketDetailLoading: (state, action) => {
      state.ticketDetailLoading = action.payload;
    },
    setMessagesLoading: (state, action) => {
      state.messagesLoading = action.payload;
    },
    setSending: (state, action) => {
      state.sending = action.payload;
    },
    setAiLoading: (state, action) => {
      state.aiLoading = action.payload;
    },
    updateTicketStatus: (state, action) => {
      const { ticketId, status } = action.payload;
      if (state.activeTicket && state.activeTicket._id === ticketId) {
        state.activeTicket.status = status;
      }
      const idx = state.tickets.findIndex((t) => t._id === ticketId);
      if (idx !== -1) state.tickets[idx].status = status;
    },
    clearActiveTicket: (state) => {
      state.activeTicket = null;
      state.activeTicketMessages = [];
    },
  },
});

export const {
  setTickets,
  setTicketsLoading,
  setActiveFilter,
  setActiveTicket,
  setActiveTicketMessages,
  appendMessage,
  setTicketDetailLoading,
  setMessagesLoading,
  setSending,
  setAiLoading,
  updateTicketStatus,
  clearActiveTicket,
} = ticketSlice.actions;

export default ticketSlice.reducer;
