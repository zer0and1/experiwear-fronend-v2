import { Layout, QuickPoll, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function NewsPage() {
  usePathIndicator(LINKS.promo);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_TYPES.SURVEY.VALUE}
            link={LINKS.quickPollSent.path}
          />
        </>
      }
    >
      <QuickPoll />
    </Layout>
  );
}
