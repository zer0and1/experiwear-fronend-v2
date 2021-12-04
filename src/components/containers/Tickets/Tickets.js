import { Card, CardContent, makeStyles, Tab, Tabs } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import { useState } from 'react';
import { TicketTable, TicketForm } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncAction } from 'hooks';
import { getTickets, insertTicket } from 'redux/actions/tickets';

const TABS = Object.freeze({
  tickets: {
    id: 'tickets',
    label: 'TICKETS',
  },
  newTickets: {
    id: 'newTickets',
    label: 'NEW TICKETS',
  },
  uploadTickets: {
    id: 'uploadTickets',
    label: 'UPLOAD TICKETS',
  },
});

const useStyles = makeStyles({
  tabPanel: {
    flexGrow: 1,
    height: 0,
    overflow: 'auto',
  },
});

const Tickets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(TABS.tickets.id);
  const tickets = useSelector((state) => state.main.tickets.results);

  const handleSubmit = (data) => {
    dispatch(insertTicket(data));
  };

  useAsyncAction(getTickets(), !tickets.length);

  return (
    <Card>
      <CardContent>
        <Tabs value={tab} onChange={(e, t) => setTab(t)}>
          <Tab value={TABS.tickets.id} label={TABS.tickets.label} />
          <Tab value={TABS.newTickets.id} label={TABS.newTickets.label} />
          <Tab value={TABS.uploadTickets.id} label={TABS.uploadTickets.label} />
        </Tabs>
        <TabContext value={tab}>
          <TabPanel value={TABS.tickets.id} className={classes.tabPanel}>
            <TicketTable tickets={tickets} />
          </TabPanel>
          <TabPanel value={TABS.newTickets.id} className={classes.tabPanel}>
            <TicketForm onSubmit={handleSubmit} />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default Tickets;
