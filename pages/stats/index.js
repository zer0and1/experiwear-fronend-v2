import { Layout } from 'components';
import Stats from 'containers/Stats';
import { ActivityTimeline } from 'sidebars';

export default function HomePage() {

  return (
    <Layout sidebar={<ActivityTimeline />}>
      <Stats />
    </Layout>
  )
};
