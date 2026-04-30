import axiosInstance from '../../../lib/axios';

export const uploadContextFileApi = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance.post('/api/admin/tenant/context', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
