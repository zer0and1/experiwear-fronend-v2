import { memo } from 'react';
import { Grid } from '@material-ui/core';

import StatsCard from 'parts/StatsCard';
import CreateScoreAlert from './CreateScoreAlert';
import ScoreList from './ScoreList';

const Score = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <CreateScoreAlert />
      </Grid>
      <Grid item xs={12} lg={4}>
        <StatsCard />
      </Grid>
      <Grid item xs={12}>
        <ScoreList />
      </Grid>
    </Grid>
  );
};

export default memo(Score);
