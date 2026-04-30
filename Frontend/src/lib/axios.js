import axios from "axios";
import { store } from "../app/store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // 🔥 required for cookie JWT
});

/**
 * Request interceptor — automatically appends ?tenantId=<id> to every
 * request if a tenant is loaded in Redux.
 *
 * The backend's tenantMiddleware reads:  req.query.tenantId || req.params.tenantId
 * So passing it as a query param works for all GET, POST, PATCH, PUT, DELETE calls.
 *
 * Skipped for:
 *   - /api/auth/*  (public auth endpoints don't need tenantId)
 */
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const tenantId = state.tenant?.currentTenant?._id;

  // Skip auth routes — they're public or handle tenant resolution themselves
  const isAuthRoute = config.url?.startsWith("/api/auth");

  if (tenantId && !isAuthRoute) {
    config.params = { ...config.params, tenantId };
  }

  return config;
});

export default axiosInstance;