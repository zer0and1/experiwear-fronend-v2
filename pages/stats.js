import Layout from 'Layout';
import Stats from 'containers/Stats';
import { HomeSidebar } from 'sidebars';

export default function HomePage() {

  return (
    <Layout sidebar={<HomeSidebar />}>
      <Stats />
    </Layout>
  )
};
