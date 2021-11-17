import axios from 'services/axios';

const login = async (params) => {
  return await axios.post('/auth/signin', params);
};

const logout = async () => {
  return await axios.delete('/auth/logout');
};

const isAuthenticated = async () => {
  return await axios.get('/auth/is-authenticated');
};

const forgotPassword = async (params) => {
  return await axios.post('/auth/restore-password', params);
};

const resetPassword = async (params) => {
  return await axios.patch('/auth/restore-password', params);
};

export { login, logout, isAuthenticated, forgotPassword, resetPassword };
