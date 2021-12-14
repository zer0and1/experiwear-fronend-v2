import React from 'react';
import { Box, Grid, Divider } from '@material-ui/core';
import { TicketItem } from 'components';
import { useAsyncAction, usePagination } from 'hooks';
import { getFanbands, getTickets } from 'redux/actions';
import { useSelector } from 'react-redux';

const TicketTable = () => {
  const { results: tickets, total } = useSelector(
    (state) => state.main.tickets
  );
  const { paginator } = usePagination({
    count: total,
    action: getTickets,
  });

  // fetch fanbands for ticket items
  useAsyncAction(getFanbands());

  return (
    <Box>
      <Grid container spacing={4}>
        {tickets.map((ticket, idx) => (
          <Grid item key={idx} xs={12}>
            <TicketItem data={ticket} mb="38px" />
            {idx < tickets.length - 1 && <Divider />}
          </Grid>
        ))}
      </Grid>
      {paginator}
    </Box>
  );
};

export default TicketTable;
