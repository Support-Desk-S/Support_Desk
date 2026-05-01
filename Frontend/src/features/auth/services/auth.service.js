import axios from "../../../lib/axios";

export const loginApi = (data) => axios.post("/api/auth/login", data);

export const registerApi = (data) => axios.post("/api/auth/register", data);

export const tenantRegisterApi = (data) =>
  axios.post("/api/auth/tenant/register", data);

export const getMeApi = () => axios.get("/api/auth/me");

export const updatePasswordApi = (data) =>
  axios.patch("/api/auth/update-password", data);
