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
        { path: LINKS.STATS.HREF, label: LINKS.STATS.TITLE },
        { path: LINKS.STATS_FANBANDS.HREF, label: LINKS.STATS_FANBANDS.TITLE },
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
