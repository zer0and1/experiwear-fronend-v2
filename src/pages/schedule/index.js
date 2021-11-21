import { Layout, Schedule, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function SchedulePage() {
  usePathIndicator({ path: LINKS.SCHEDULE.HREF, label: LINKS.SCHEDULE.TITLE });

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_TYPES.SCHEDULE.VALUE}
            link={LINKS.SCHEDULE_ALERTS_SENT.HREF}
          />
        </>
      }
    >
      <Schedule />
    </Layout>
  );
}
