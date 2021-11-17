import { Layout } from 'components';
import SelectedGame from 'containers/SelectedGame';
import { SelectedGameSidebar } from 'sidebars';

export default function HomePage() {
  return (
    <Layout sidebar={<SelectedGameSidebar />}>
      <SelectedGame />
    </Layout>
  );
}
