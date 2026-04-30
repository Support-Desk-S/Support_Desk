import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice";
import tenantReducer from "../features/tenant/state/tenantSlice";
import ticketReducer from "../features/tickets/state/ticketSlice";
import agentReducer from "../features/agents/state/agentSlice";
import widgetReducer from "../features/widgets/state/widgetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tenant: tenantReducer,
    tickets: ticketReducer,
    agents: agentReducer,
    widgets: widgetReducer,
  },
});