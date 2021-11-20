import { HomeSidebar, Layout, Home } from 'components';

export default function HomePage() {
  return (
    <Layout sidebar={<HomeSidebar />}>
      <Home />
    </Layout>
  );
}
