import News from 'containers/News';
import { Layout } from 'components';
import { CurrentFanbandStats, NewsAlertsSent } from 'sidebars';

export default function NewsPage() {
  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <NewsAlertsSent />
        </>
      }
    >
      <News />
    </Layout>
  );
}
