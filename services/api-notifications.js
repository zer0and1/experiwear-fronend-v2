
import axios from 'services/axios'
import { ALERT_TYPES } from 'utils/constants';

const getNotifications = async (params) => {
  return await axios.get('/notifications', { params });
};

const getLatestNotification = async (params) => {
  return await axios.get('/notifications/latest', { params });
};

const createNotification = async (params, images) => {
  const formData = new FormData();
  formData.append('title', params.title);
  formData.append('body', params.body);
  formData.append('type', ALERT_TYPES.NEWS.VALUE);
  formData.append('ledType', params.ledType);
  formData.append('topColor1', params.topColor1);
  formData.append('topColor2', params.topColor2);
  formData.append('topColor3', params.topColor3);
  formData.append('bottomColor1', params.bottomColor1);
  formData.append('bottomColor2', params.bottomColor2);
  formData.append('bottomColor3', params.bottomColor3);
  formData.append('vibrationType', params.vibrationType);
  formData.append('vibrationIntensity', params.vibrationIntensity);
  formData.append('duration', params.duration);

  if (images.length) {
    formData.append('file', images[0].file);
  }
  
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';

  return await axios.post('/notifications/broadcast', formData);
};

export {
  getNotifications,
  getLatestNotification,
  createNotification,
};
