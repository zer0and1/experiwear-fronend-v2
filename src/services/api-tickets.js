import axios from 'services/axios';

export const createTicket = async (params) => {
  return await axios.post('/tickets', { ...params, row: parseInt(params.row) });
};

export const updateTicket = async (id, params) => {
  return await axios.put(`/tickets/${id}`, {
    ...params,
    row: parseInt(params.row),
  });
};

export const readTickets = async (params) => {
  return await axios.get('/tickets', { params });
};

export const deleteTicket = async (id) => {
  return await axios.delete(`/tickets/${id}`);
};
