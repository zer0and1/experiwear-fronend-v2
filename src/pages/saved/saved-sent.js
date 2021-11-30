import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([LINKS.news, LINKS.newsSent]);

  return useAlertsSent(ALERT_TYPES.NEWS.VALUE, 'News alerts sent');
};

export default NewsAlertsSent;
