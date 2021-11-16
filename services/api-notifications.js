
import axios from 'services/axios'

const getNotifications = async (params) => {
  return await axios.get('/notifications', { params });
};

const getLatestNotification = async (params) => {
  return await axios.get('/notifications/latest', { params });
};

const createNotification = async (formData) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';

  return await axios.post('/notifications/broadcast', formData);
};

export {
  getNotifications,
  getLatestNotification,
  createNotification,
};
