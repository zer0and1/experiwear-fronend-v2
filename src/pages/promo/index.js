import { Layout, Promo, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function PromoPage() {
  usePathIndicator(LINKS.promo);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_TYPES.PROMO.VALUE}
            link={LINKS.promoSent.path}
          />
        </>
      }
    >
      <Promo />
    </Layout>
  );
}
