import { memo, useState } from 'react';
import { Grid } from '@material-ui/core';

import StatsCard from 'parts/StatsCard';
import CreateScheduleAlert from './CreateScheduleAlert';
import ScheduleList from './ScheduleList';

const Schedule = () => {
  const [selectedItem, setSelectedItem] = useState({});

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <CreateScheduleAlert
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <StatsCard />
      </Grid>
      <Grid item xs={12}>
        <ScheduleList setSelectedItem={setSelectedItem} />
      </Grid>
    </Grid>
  );
};

export default memo(Schedule);
