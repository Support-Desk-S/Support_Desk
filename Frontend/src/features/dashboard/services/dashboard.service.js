import axiosInstance from '../../../lib/axios';

export const getStatsApi = () => axiosInstance.get('/api/admin/stats');
