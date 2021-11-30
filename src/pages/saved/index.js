import { Layout, Saved, CurrentFanbandStats } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function SavedPage() {
  usePathIndicator(LINKS.saved);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <Saved />
    </Layout>
  );
}
