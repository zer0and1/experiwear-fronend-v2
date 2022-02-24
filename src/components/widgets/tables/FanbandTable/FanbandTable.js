import { Grid, Divider } from '@material-ui/core';
import { FanbandItem } from 'components';

const FanbandTable = ({ fanbands = [] }) => {
  return (
    <Grid container spacing={4}>
      {fanbands.map((fanband, idx) => (
        <Grid item key={idx} xs={12}>
          <FanbandItem data={fanband} mb="38px" />
          {idx < fanbands.length - 1 && <Divider />}
        </Grid>
      ))}
    </Grid>
  );
};

export default FanbandTable;
