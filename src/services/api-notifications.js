import axios from 'services/axios';

export const getNotifications = async (params) => {
  return await axios.get('/notifications', { params });
};

export const getLatestNotification = async (params) => {
  return await axios.get('/notifications/latest', { params });
};

export const createNotification = async (formData) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';

  return await axios.post('/notifications/broadcast', formData);
};
