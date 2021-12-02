import axios from 'services/axios';

export const getFanbandsStatistics = async () => {
  return await axios.get('/fanbands/statistics');
};

export const readFanbands = async () => {
  return await axios.get('/fanbands');
};
