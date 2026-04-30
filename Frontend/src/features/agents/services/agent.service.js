import axiosInstance from '../../../lib/axios';

export const getUsersApi = () => axiosInstance.get('/api/admin/users');

export const approveUserApi = (userId, isApproved) =>
  axiosInstance.patch(`/api/admin/users/${userId}/approve`, { isApproved });

export const updateUserRoleApi = (userId, role) =>
  axiosInstance.patch(`/api/admin/users/${userId}/role`, { role });
