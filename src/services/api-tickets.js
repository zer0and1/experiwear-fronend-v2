import axios from 'services/axios';
import { getFormData } from 'utils/helpers';

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

export const uploadTicketsFromCsv = async (
  file,
  onUploadProgress,
  cancelToken
) => {
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.post('/tickets/upload-csv', getFormData({ file }), {
    onUploadProgress,
    cancelToken,
  });
};
