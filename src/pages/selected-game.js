import { Layout } from 'components';
import SelectedGame from 'components/widgets/SelectedGame';
import { SelectedGameSidebar } from 'components';

export default function HomePage() {
  return (
    <Layout sidebar={<SelectedGameSidebar />}>
      <SelectedGame />
    </Layout>
  );
}
