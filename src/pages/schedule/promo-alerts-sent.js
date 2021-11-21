import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.schedule.path, label: LINKS.schedule.title },
    {
      path: LINKS.scheduledSent.path,
      label: LINKS.scheduledSent.TITLE,
    },
  ]);

  return useAlertsSent(ALERT_TYPES.SCHEDULE.VALUE, 'Active scheduled alerts');
};

export default NewsAlertsSent;
