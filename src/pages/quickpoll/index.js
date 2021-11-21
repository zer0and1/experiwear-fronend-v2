import { Layout, QuickPoll, CurrentFanbandStats, AlertsSent } from 'components';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function NewsPage() {
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
