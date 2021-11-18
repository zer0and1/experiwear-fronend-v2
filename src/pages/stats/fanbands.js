import { Layout } from 'components';
import Fanbands from 'components/widgets/Fanbands';
import { ActivityTimeline } from 'components';

export default function HomePage() {
  return (
    <Layout sidebar={<ActivityTimeline />}>
      <Fanbands />
    </Layout>
  );
}
