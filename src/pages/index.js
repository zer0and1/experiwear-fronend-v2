import { HomeSidebar, Layout, Home } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function HomePage() {
  usePathIndicator({ path: LINKS.home.path, label: LINKS.home.title });

  return (
    <Layout sidebar={<HomeSidebar />}>
      <Home />
    </Layout>
  );
}
