import { Layout, CurrentFanbandStats, QuickPollSentAll } from 'components';
import { LINKS } from 'utils/constants';
import { usePathIndicator } from 'hooks';

const QuickPollAlertsSent = () => {
  usePathIndicator([
    { path: LINKS.QUICKPOLL.HREF, label: LINKS.QUICKPOLL.TITLE },
    {
      path: LINKS.QUICKPOLL_ALERTS_SENT.HREF,
      label: LINKS.QUICKPOLL_ALERTS_SENT.TITLE,
    },
  ]);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <QuickPollSentAll />
    </Layout>
  );
};

export default QuickPollAlertsSent;
