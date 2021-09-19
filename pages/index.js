import Layout from 'Layout';
import Home from 'containers/Home';
import { HomeSidebar } from 'sidebars';

export default function HomePage() {

  return (
    <Layout sidebar={<HomeSidebar />}>
      <Home />
    </Layout>
  )
};
