import { Layout } from 'components';
import Home from 'components/widgets/Home';
import { HomeSidebar } from 'components';

export default function HomePage() {
  return (
    <Layout sidebar={<HomeSidebar />}>
      <Home />
    </Layout>
  );
}
