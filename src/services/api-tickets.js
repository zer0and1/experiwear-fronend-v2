import axios from 'services/axios';

export const createTicket = async (params) => {
  return await axios.post('/tickets', { ...params, row: parseInt(params.row) });
};

export const readTickets = async (params) => {
  return await axios.get('/tickets', { params });
};
