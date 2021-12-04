import axios from 'services/axios';

export const createTicket = async (params) => {
  return await axios.post('/tickets', params);
};

export const readTickets = async (params) => {
  return await axios.get('/tickets', { params });
};
