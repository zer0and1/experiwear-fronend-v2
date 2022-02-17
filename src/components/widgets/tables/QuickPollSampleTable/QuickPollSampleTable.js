import { Grid, Divider } from '@material-ui/core';
import { QuickPollSampleItem } from 'components';

const QuickPollSampleTable = ({ quickPolls = [] }) => {
  return (
    <Grid container spacing={4}>
      {quickPolls.map((quickPoll, idx) => (
        <Grid item key={idx} xs={12}>
          <QuickPollSampleItem data={quickPoll} mb={16} />
          {idx < quickPolls.length - 1 && <Divider />}
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickPollSampleTable;
