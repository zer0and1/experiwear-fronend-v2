import { makeStyles, Tab, Tabs } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import { useState } from 'react';
import { FHCard, FHCardHeader, FHCardContent } from 'components';
import { FANBAND_LABELS, FANBAND_TYPES } from 'utils/constants';

const useStyles = makeStyles({
  tabPanel: {
    flexGrow: 1,
    height: 0,
    overflow: 'auto',
  },
});

const Fanbands = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(FANBAND_TYPES.provisioned);

  return (
    <FHCard>
      <FHCardHeader
        title={
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
            <Tab
              value={FANBAND_TYPES.provisioned}
              label={FANBAND_LABELS[FANBAND_TYPES.provisioned]}
            />
            <Tab
              value={FANBAND_TYPES.nonProvisioned}
              label={FANBAND_LABELS[FANBAND_TYPES.nonProvisioned]}
            />
            <Tab
              value={FANBAND_TYPES.all}
              label={FANBAND_LABELS[FANBAND_TYPES.all]}
            />
          </Tabs>
        }
      />
      <FHCardContent>
        <TabContext value={tab}>
          <TabPanel
            className={classes.tabPanel}
            value={FANBAND_TYPES.provisioned}
          ></TabPanel>
        </TabContext>
      </FHCardContent>
    </FHCard>
  );
};

export default Fanbands;
