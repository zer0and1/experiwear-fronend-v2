import { Layout, CurrentFanbandStats, QuickPollSentAll } from 'components';
import { LINKS } from 'utils/constants';
import { usePathIndicator } from 'hooks';

const QuickPollAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.quickPoll.path, label: LINKS.quickPoll.title },
    {
      path: LINKS.quickPollSent.path,
      label: LINKS.quickPollSent.TITLE,
    },
  ]);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <QuickPollSentAll />
    </Layout>
  );
};

export default QuickPollAlertsSent;
