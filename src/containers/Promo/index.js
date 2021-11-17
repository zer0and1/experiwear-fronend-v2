import { memo } from 'react';
import { Grid } from '@material-ui/core';

import StatsCard from 'parts/StatsCard';
import CreatePromoAlert from './CreatePromoAlert';
import PromoList from './PromoList';

const Promo = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <CreatePromoAlert />
      </Grid>
      <Grid item xs={12} lg={4}>
        <StatsCard />
      </Grid>
      <Grid item xs={12}>
        <PromoList />
      </Grid>
    </Grid>
  );
};

export default memo(Promo);
