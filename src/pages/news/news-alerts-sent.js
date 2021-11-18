import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.NEWS.HREF, label: LINKS.NEWS.TITLE },
    {
      path: LINKS.NEWS_ALERTS_SENT.HREF,
      label: LINKS.NEWS_ALERTS_SENT.TITLE,
    },
  ]);

  return useAlertsSent(ALERT_TYPES.NEWS.VALUE, 'News alerts sent');
};

export default NewsAlertsSent;
