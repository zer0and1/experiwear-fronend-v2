import { Layout, News, CurrentFanbandStats, AlertsSent } from 'components';
import { ALERT_TYPES, LINKS } from 'utils/constants';

export default function NewsPage() {
  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_TYPES.NEWS.VALUE}
            link={LINKS.newsSent.path}
          />
        </>
      }
    >
      <News />
    </Layout>
  );
}
