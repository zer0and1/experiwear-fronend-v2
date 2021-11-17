import axios from 'services/axios';

const getScheduledNotifications = async (params) => {
  return await axios.get('/notifications/scheduled', { params });
};

const getLatestScheduledNotifications = async () => {
  return await axios.get('/notifications/scheduled/latest');
};

const createScheduledNotification = async (params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.post('/notifications/scheduled-broadcast', params);
};

const editScheduledNotification = async (id, params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.put(`/notifications/scheduled-broadcast/${id}`, params);
};

const deleteScheduledNotification = async (id) => {
  return await axios.delete(`/notifications/scheduled-broadcast/${id}`);
};

export {
  getScheduledNotifications,
  getLatestScheduledNotifications,
  createScheduledNotification,
  editScheduledNotification,
  deleteScheduledNotification,
};
