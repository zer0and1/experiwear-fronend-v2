import { Layout, GamedayTheme, CurrentFanbandStats } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function GamedayThemePage() {
  usePathIndicator(LINKS.gamedayTheme);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <GamedayTheme />
    </Layout>
  );
}
