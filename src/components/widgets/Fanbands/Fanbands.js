import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Tabs } from '@material-ui/core';
import { setPathTokens } from 'redux/actions/auxiliary';
import LINKS from 'utils/constants/links';
import { TabContext } from '@material-ui/lab';

const Fanbands = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPathTokens([
        { path: LINKS.stats.path, label: LINKS.stats.title },
        { path: LINKS.statsFanbands.path, label: LINKS.statsFanbands.TITLE },
      ])
    );
  }, [dispatch]);

  return (
    <Card>
      <CardContent>
        <TabContext></TabContext>
        <Tabs></Tabs>
      </CardContent>
    </Card>
  );
};

export default Fanbands;
