import axios from 'services/axios';

const getCanneds = async (params) => {
  return await axios.get('/canneds', { params });
};

const createCanned = async (params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.post('/canneds', params);
};

const editCanned = async (id, params) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.put(`/canneds/${id}`, params);
};

const deleteCanned = async (id) => {
  return await axios.delete(`/canneds/${id}`);
};

const sendCanned = async (id) => {
  return await axios.post(`/canneds/${id}/send`, { id });
};

export { getCanneds, createCanned, editCanned, deleteCanned, sendCanned };
