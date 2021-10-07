import Layout from 'Layout';
import Fanbands from 'containers/Fanbands';
import { ActivityTimeline } from 'sidebars';

export default function HomePage() {

  return (
    <Layout sidebar={<ActivityTimeline />}>
      <Fanbands />
    </Layout>
  )
};
