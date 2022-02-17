import { Layout, CurrentFanbandStats, QuickPollAlertSample } from 'components';
import { LINKS } from 'utils/constants';
import { usePathIndicator } from 'hooks';
import { useRouter } from 'next/router';

const QuickPollAlertSamplePage = () => {
  const {
    query: { id },
  } = useRouter();

  usePathIndicator([
    LINKS.quickPoll,
    LINKS.quickPollSent,
    LINKS.quickPollSample,
  ]);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <QuickPollAlertSample />
    </Layout>
  );
};

export default QuickPollAlertSamplePage;
