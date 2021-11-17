const getPercent = (value = 0, total) => {
  return total === 0
    ? 0
    : Math.round((parseFloat(value) / parseFloat(total)) * 100);
};

export default getPercent;
