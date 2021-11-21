import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const ScheduledSentPage = () => {
  usePathIndicator([LINKS.scheduled, LINKS.scheduledSent]);

  return useAlertsSent(ALERT_TYPES.SCHEDULE.VALUE, 'Active scheduled alerts');
};

export default ScheduledSentPage;
