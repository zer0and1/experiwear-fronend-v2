import { HomeSidebar, Layout, Home } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function HomePage() {
  usePathIndicator(LINKS.home);

  return (
    <Layout sidebar={<HomeSidebar />}>
      <Home />
    </Layout>
  );
}
