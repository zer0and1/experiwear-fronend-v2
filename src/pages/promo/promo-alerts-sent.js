import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.PROMO.HREF, label: LINKS.PROMO.TITLE },
    {
      path: LINKS.PROMO_ALERTS_SENT.HREF,
      label: LINKS.PROMO_ALERTS_SENT.TITLE,
    },
  ]);

  return useAlertsSent(ALERT_TYPES.PROMO.VALUE, 'Promo alerts sent');
};

export default NewsAlertsSent;
