import moment from 'moment';

export const getEnglishDateWithTime = (date) => {
  if (!!date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
  return '';
};

export const getEnglishDate = (date) => {
  if (!!date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  return '';
};

export const getEnglishTime = (date) => {
  if (!!date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
  return '';
};

export const getISODate = (value) => {
  const [yyyy, mm, dd, hh, mi] = value.split(/[/:\-T]/);

  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

export const getLocalDate = (value) => {
  const date = new Date(value);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mi = date.getMinutes();

  return `${yyyy}-${mm > 10 ? mm : `0${mm}`}-${dd > 10 ? dd : `0${dd}`}T${
    hh > 10 ? hh : `0${hh}`
  }:${mi > 10 ? mi : `0${mi}`}`;
};

export const conv2time = (datetime) =>
  moment(moment(datetime).format('HHmm'), 'HHmm');
