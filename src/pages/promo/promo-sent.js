import { ALERT_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([LINKS.promo, LINKS.promoSent]);

  return useAlertsSent(ALERT_TYPES.PROMO.VALUE, 'Promo alerts sent');
};

export default NewsAlertsSent;
