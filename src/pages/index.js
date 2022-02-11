import {
  HomeSidebar,
  Layout,
  Home,
  SelectedGame,
  SelectedGameSidebar,
} from 'components';
import { useSelector } from 'react-redux';
import { isEmpty } from 'utils/helpers';
import { useMemo } from 'react';

export default function HomePage() {
  const isSelectedGame = useSelector(
    (state) => !isEmpty(state.games.selectedGame)
  );
  const sidebar = useMemo(
    () => (isSelectedGame ? <SelectedGameSidebar /> : <HomeSidebar />),
    [isSelectedGame]
  );
  const content = useMemo(
    () => (isSelectedGame ? <SelectedGame /> : <Home />),
    [isSelectedGame]
  );

  return <Layout sidebar={sidebar}>{content}</Layout>;
}
