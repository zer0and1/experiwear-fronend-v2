import QuickPoll from 'components/widgets/QuickPoll';
import { Layout } from 'components';
import { CurrentFanbandStats, SurveyAlertsSent } from 'components';

export default function NewsPage() {
  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <SurveyAlertsSent />
        </>
      }
    >
      <QuickPoll />
    </Layout>
  );
}
