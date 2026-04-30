import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTenant: null,
  loading: false,
  error: null,
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenant: (state, action) => {
      state.currentTenant = action.payload;
      state.error = null;
    },
    setTenantLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTenantError: (state, action) => {
      state.error = action.payload;
      state.currentTenant = null;
    },
    clearTenant: (state) => {
      state.currentTenant = null;
      state.error = null;
    },
  },
});

export const { setTenant, setTenantLoading, setTenantError, clearTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
