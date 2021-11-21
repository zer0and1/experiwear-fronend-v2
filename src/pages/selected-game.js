import { Layout, SelectedGame, SelectedGameSidebar } from 'components';

export default function HomePage() {
  return (
    <Layout sidebar={<SelectedGameSidebar />}>
      <SelectedGame />
    </Layout>
  );
}
