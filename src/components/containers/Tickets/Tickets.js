import { makeStyles, Tab, Tabs, Card, CardContent } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import { useState } from 'react';
import { TicketTable, TicketForm, TicketUpload } from 'components';
import { useDispatch } from 'react-redux';
import { insertTicket } from 'redux/actions/tickets';

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

  const handleSubmit = async (data) => {
    await dispatch(insertTicket(data));
  };

  return (
    <Card>
      <CardContent>
        <Tabs value={tab} onChange={(e, t) => setTab(t)}>
          <Tab value={TABS.tickets.id} label={TABS.tickets.label} />
          <Tab value={TABS.newTickets.id} label={TABS.newTickets.label} />
          <Tab value={TABS.uploadTickets.id} label={TABS.uploadTickets.label} />
        </Tabs>
        <TabContext value={tab}>
          <TabPanel value={TABS.tickets.id}>
            <TicketTable />
          </TabPanel>
          <TabPanel value={TABS.newTickets.id} className={classes.tabPanel}>
            <TicketForm onSubmit={handleSubmit} />
          </TabPanel>
          <TabPanel value={TABS.uploadTickets.id} className={classes.tabPanel}>
            <TicketUpload />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default Tickets;
