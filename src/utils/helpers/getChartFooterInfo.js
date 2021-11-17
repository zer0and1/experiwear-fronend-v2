import theme from 'styles/theme';

const getChartFooterInfo = (type) => {
  switch (type) {
    case 'yes':
      return {
        color: theme.custom.palette.purple,
        label: 'Yes',
      };
    case 'no':
      return {
        color: theme.custom.palette.yellow,
        label: 'No',
      };
    case 'noResponse':
      return {
        color: theme.custom.palette.red,
        label: 'No Response',
      };
    case 'sent':
      return {
        color: theme.custom.palette.purple,
        label: 'Sent',
      };
    case 'received':
      return {
        color: theme.custom.palette.yellow,
        label: 'Received',
      };
    case 'notReceived':
      return {
        color: theme.custom.palette.purple,
        label: 'Not Received',
      };
    case 'reacted':
      return {
        color: theme.custom.palette.red,
        label: 'Reacted',
      };
    default:
      return {
        color: theme.custom.palette.purple,
        label: 'Yes',
      };
  }
};

export default getChartFooterInfo;
