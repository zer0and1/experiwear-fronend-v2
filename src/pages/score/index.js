import { Layout, Score, CurrentFanbandStats, AlertsSent } from 'components';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function ScorePage() {
  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_TYPES.SCORE.VALUE}
            link={LINKS.SCORE_ALERTS_SENT.HREF}
          />
        </>
      }
    >
      <Score />
    </Layout>
  );
}
