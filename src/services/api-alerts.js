import axios from 'services/axios';
import { getFormData } from 'utils/helpers';

export const getNotifications = async (params) => {
  return await axios.get('/notifications', { params });
};

export const getLatestNotification = async (params) => {
  return await axios.get('/notifications/latest', { params });
};

export const createNotification = async (params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';

  return await axios.post('/notifications/broadcast', getFormData(params));
};

export const getScheduledNotifications = async (params) => {
  return await axios.get('/notifications/schedule/scheduled', { params });
};

export const getLatestScheduledNotifications = async () => {
  return await axios.get('/notifications/scheduled/latest');
};

export const createScheduledNotification = async (params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.post('/notifications/schedule', getFormData(params));
};

export const updateScheduledAlert = async (id, params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.put(`/notifications/schedule/${id}`, getFormData(params));
};

export const deleteScheduledAlert = async (id) => {
  return await axios.delete(`/notifications/schedule/${id}`);
};

export const getAccelerometerData = async (params) => {
  return await axios.get('/accelerometer', { params });
};

export const createSavedAlert = async (params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.post('/notifications/saved', getFormData(params));
};

export const sendSavedAlert = async (id) => {
  return await axios.post(`/notifications/saved/${id}/send`);
};

export const updateSavedAlert = async (id, params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.put(`/notifications/saved/${id}`, getFormData(params));
};

export const deleteSavedAlert = async (id) => {
  return await axios.delete(`/notifications/saved/${id}`);
};

export const getGamedayPresets = async () => {
  return await axios.get('/api/notifications/gameday-theme/admin-panel');
};

export const uploadGamedayPresets = async (files) => {
  return await axios.post(
    '/api/notifications/gameday-theme',
    getFormData({ files })
  );
};
