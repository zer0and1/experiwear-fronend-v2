import axios from 'services/axios';

const getAccelerometerData = async (params) => {
  return await axios.get('/accelerometer', { params });
};

export { getAccelerometerData };
