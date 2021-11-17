import moment from 'moment';

export const conv2time = (datetime) =>
  moment(moment(datetime).format('HHmm'), 'HHmm');
