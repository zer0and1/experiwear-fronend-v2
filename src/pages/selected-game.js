import { Layout, SelectedGame, SelectedGameSidebar } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function HomePage() {
  usePathIndicator(LINKS.selectedGame);

  return (
    <Layout sidebar={<SelectedGameSidebar />}>
      <SelectedGame />
    </Layout>
  );
}
