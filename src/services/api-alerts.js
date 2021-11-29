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

export const getScheduledNotifications = async (params) => {
  return await axios.get('/notifications/scheduled', { params });
};

export const getLatestScheduledNotifications = async () => {
  return await axios.get('/notifications/scheduled/latest');
};

export const createScheduledNotification = async (params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.post('/notifications/scheduled-broadcast', params);
};

export const editScheduledNotification = async (id, params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.put(`/notifications/scheduled-broadcast/${id}`, params);
};

export const deleteScheduledNotification = async (id) => {
  return await axios.delete(`/notifications/scheduled-broadcast/${id}`);
};

export const getAccelerometerData = async (params) => {
  return await axios.get('/accelerometer', { params });
};
