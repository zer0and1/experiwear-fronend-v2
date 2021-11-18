import News from 'components/widgets/News';
import { Layout } from 'components';
import { CurrentFanbandStats, NewsAlertsSent } from 'components';

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
