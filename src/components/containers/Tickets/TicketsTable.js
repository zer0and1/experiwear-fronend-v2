import { Grid, Divider } from '@material-ui/core';
import { TicketItem } from 'components';

const TicketTable = ({ tickets = [] }) => {
  return (
    <Grid container spacing={4}>
      {tickets.map((ticket, idx) => (
        <Grid item key={idx} xs={12}>
          <TicketItem data={ticket} mb="38px" />
          {idx < tickets.length - 1 && <Divider />}
        </Grid>
      ))}
    </Grid>
  );
};

export default TicketTable;
