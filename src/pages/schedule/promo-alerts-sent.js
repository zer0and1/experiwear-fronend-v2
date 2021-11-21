import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.SCHEDULE.HREF, label: LINKS.SCHEDULE.TITLE },
    {
      path: LINKS.SCHEDULE_ALERTS_SENT.HREF,
      label: LINKS.SCHEDULE_ALERTS_SENT.TITLE,
    },
  ]);

  return useAlertsSent(ALERT_TYPES.SCHEDULE.VALUE, 'Active scheduled alerts');
};

export default NewsAlertsSent;
