import { Accelerometer, Layout } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function NewsPage() {
  usePathIndicator(LINKS.accelerometer);

  return (
    <Layout>
      <Accelerometer />
    </Layout>
  );
}
