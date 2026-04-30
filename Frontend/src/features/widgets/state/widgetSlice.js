import { createSlice } from '@reduxjs/toolkit';

const widgetSlice = createSlice({
  name: 'widgets',
  initialState: { widgets: [], selectedWidget: null, loading: false },
  reducers: {
    setWidgets: (state, action) => {
      state.widgets = Array.isArray(action.payload) ? action.payload : [];
    },
    setSelectedWidget: (state, action) => { state.selectedWidget = action.payload; },
    setWidgetsLoading: (state, action) => { state.loading = action.payload; },
    addWidget: (state, action) => { state.widgets.unshift(action.payload); },
    updateWidgetInList: (state, action) => {
      const idx = state.widgets.findIndex((w) => w._id === action.payload._id);
      if (idx !== -1) state.widgets[idx] = action.payload;
    },
    removeWidget: (state, action) => {
      state.widgets = state.widgets.filter((w) => w._id !== action.payload);
    },
  },
});

export const {
  setWidgets, setSelectedWidget, setWidgetsLoading,
  addWidget, updateWidgetInList, removeWidget,
} = widgetSlice.actions;
export default widgetSlice.reducer;
