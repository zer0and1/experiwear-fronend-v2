import { Layout, Stats, ActivityTimeline } from 'components';

export default function HomePage() {
  return (
    <Layout sidebar={<ActivityTimeline />}>
      <Stats />
    </Layout>
  );
}
