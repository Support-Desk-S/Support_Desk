import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  total: 0,
  loading: false,
  activeFilter: 'all',
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
  },
});

export const { setTickets, setTicketsLoading, setActiveFilter } = ticketSlice.actions;
export default ticketSlice.reducer;
