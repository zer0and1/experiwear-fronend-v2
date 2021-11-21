import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.news.path, label: LINKS.newsTITLE },
    {
      path: LINKS.newsSent.path,
      label: LINKS.newsSent.TITLE,
    },
  ]);

  return useAlertsSent(ALERT_TYPES.NEWS.VALUE, 'News alerts sent');
};

export default NewsAlertsSent;
