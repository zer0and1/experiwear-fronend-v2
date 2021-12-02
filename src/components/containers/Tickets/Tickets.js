import { Card, CardContent, makeStyles, Tab, Tabs } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import { useState } from 'react';
import { TicketTable, TicketForm } from 'components';

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
  const [tab, setTab] = useState(TABS.tickets.id);
  const tickets = Array.from({ length: 10 }).map(() => ({}));
  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab value={TABS.tickets.id} label={TABS.tickets.label} />
          <Tab value={TABS.newTickets.id} label={TABS.newTickets.label} />
          <Tab value={TABS.uploadTickets.id} label={TABS.uploadTickets.label} />
        </Tabs>
        <TabContext value={tab}>
          <TabPanel value={TABS.tickets.id} className={classes.tabPanel}>
            <TicketTable tickets={tickets} />
          </TabPanel>
          <TabPanel value={TABS.newTickets.id} className={classes.tabPanel}>
            <TicketForm />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default Tickets;
