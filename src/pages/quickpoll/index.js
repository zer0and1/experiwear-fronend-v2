import { Layout, QuickPoll, CurrentFanbandStats, AlertsSent } from 'components';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function NewsPage() {
  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_TYPES.QUICKPOLL.VALUE}
            link={LINKS.QUICKPOLL_ALERTS_SENT.HREF}
          />
        </>
      }
    >
      <QuickPoll />
    </Layout>
  );
}
