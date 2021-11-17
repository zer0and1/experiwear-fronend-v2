import axios from 'services/axios';

const getFanbandsStatistics = async () => {
  return await axios.get('/fanbands/statistics');
};

export { getFanbandsStatistics };
