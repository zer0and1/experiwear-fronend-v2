import { Layout, Schedule, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function SchedulePage() {
  usePathIndicator(LINKS.scheduled.path);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_TYPES.SCHEDULE.VALUE}
            link={LINKS.scheduledSent.path}
          />
        </>
      }
    >
      <Schedule />
    </Layout>
  );
}
