import { Grid, Divider } from '@material-ui/core';
import { QuickPollSampleItem } from 'components';

const QuickPollSampleTable = ({ answers = [] }) => {
  return (
    <Grid container spacing={4}>
      {answers.map((answer, idx) => (
        <Grid item key={idx} xs={12}>
          <QuickPollSampleItem data={answer} mb={16} />
          {idx < answers.length - 1 && <Divider />}
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickPollSampleTable;
