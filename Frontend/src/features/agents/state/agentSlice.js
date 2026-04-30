import { createSlice } from '@reduxjs/toolkit';

const agentSlice = createSlice({
  name: 'agents',
  initialState: { users: [], loading: false },
  reducers: {
    setUsers: (state, action) => { state.users = action.payload; },
    setAgentsLoading: (state, action) => { state.loading = action.payload; },
    updateUserInList: (state, action) => {
      const idx = state.users.findIndex((u) => u._id === action.payload._id);
      if (idx !== -1) state.users[idx] = action.payload;
    },
  },
});

export const { setUsers, setAgentsLoading, updateUserInList } = agentSlice.actions;
export default agentSlice.reducer;
