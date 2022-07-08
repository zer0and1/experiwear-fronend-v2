import {
  HomeSidebar,
  Layout,
  Home,
  SelectedGame,
  SelectedGameSidebar,
} from 'components';
import { useMemo, useState } from 'react';
import { Box, Link } from '@material-ui/core';

export default function HomePage() {
  const [isMonthlyView, setMonthlyView] = useState(true);

  const sidebar = useMemo(
    () => (isMonthlyView ? <HomeSidebar /> : <SelectedGameSidebar />),
    [isMonthlyView]
  );

  const content = useMemo(
    () => (isMonthlyView ? <Home /> : <SelectedGame />),
    [isMonthlyView]
  );

  const handleChangeView = () => {
    setMonthlyView((view) => !view);
  };

  return (
    <Layout sidebar={sidebar} flexDirection="column">
      <Box display="flex" justifyContent="flex-end" pr={2}>
        <Link component="button" variant="body2" onClick={handleChangeView}>
          {isMonthlyView ? 'Switch to daily' : 'Switch to monthly'}
        </Link>
      </Box>
      {content}
    </Layout>
  );
}
