import { useRef, memo, useState } from 'react';
import { Grid } from '@material-ui/core';

import StatsCard from 'parts/StatsCard';
import CreateCannedAlert from './CreateCannedAlert';
import CannedList from './CannedList';

const Canned = () => {
  const [selectedItem, setSelectedItem] = useState({});

  const inputRef = useRef(null);

  const setInputFocus = () => {
    inputRef.current.focus();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <CreateCannedAlert
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          inputRef={inputRef}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <StatsCard />
      </Grid>
      <Grid item xs={12}>
        <CannedList
          setSelectedItem={setSelectedItem}
          setFocus={setInputFocus}
        />
      </Grid>
    </Grid>
  );
};

export default memo(Canned);
