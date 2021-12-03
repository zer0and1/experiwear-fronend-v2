import axios from 'services/axios';

export const readTickets = async (params) => {
  return await axios.get('/tickets', { params });
};
