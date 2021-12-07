import { Layout, Schedule, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_MIXED_TYPES, LINKS } from 'utils/constants';

export default function SchedulePage() {
  usePathIndicator(LINKS.schedule);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_MIXED_TYPES.scheduled}
            link={LINKS.scheduleSent.path}
          />
        </>
      }
    >
      <Schedule />
    </Layout>
  );
}
