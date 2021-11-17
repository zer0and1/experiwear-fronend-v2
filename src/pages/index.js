import { Layout } from 'components';
import Home from 'containers/Home';
import { HomeSidebar } from 'sidebars';

export default function HomePage() {
  return (
    <Layout sidebar={<HomeSidebar />}>
      <Home />
    </Layout>
  );
}
