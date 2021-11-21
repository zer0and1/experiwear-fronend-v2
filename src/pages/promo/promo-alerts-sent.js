import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.promo.path, label: LINKS.promo.title },
    {
      path: LINKS.promoSent.path,
      label: LINKS.promoSent.TITLE,
    },
  ]);

  return useAlertsSent(ALERT_TYPES.PROMO.VALUE, 'Promo alerts sent');
};

export default NewsAlertsSent;
