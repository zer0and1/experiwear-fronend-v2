import moment from 'moment';

export const firstDayOfMonth = (date) => {
  return moment(date).startOf('month').format('d');
};

export const lastDayOfMonth = (date) => {
  return moment(date).endOf('month').format('D');
};

export const layoutDaysOfMonth = (year, month) => {
  const date = `${year}-${month}-01`;
  const firstDay = firstDayOfMonth(date);
  const lastDay = lastDayOfMonth(date);

  return Array.from({ length: 42 })
    .map((_, idx) => {
      const day = idx - firstDay + 1;
      if (day < 1 || day > lastDay) {
        return null;
      } else {
        return day;
      }
    })
    .reduce((acc, day, idx) => {
      const row = Math.floor(idx / 7);
      return {
        ...acc,
        [row]: [...(acc?.[row] || []), day],
      };
    }, {});
};
