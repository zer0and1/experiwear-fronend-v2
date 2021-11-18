import { Layout, Promo, CurrentFanbandStats, AlertsSent } from 'components';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function PromoPage() {
  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_TYPES.PROMO.VALUE}
            link={LINKS.PROMO_ALERTS_SENT.HREF}
          />
        </>
      }
    >
      <Promo />
    </Layout>
  );
}
