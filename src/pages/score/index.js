import { Layout, Score, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function ScorePage() {
  usePathIndicator({ path: LINKS.SCORE.HREF, label: LINKS.SCORE.TITLE });

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
