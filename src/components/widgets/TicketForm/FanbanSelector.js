import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  Popover,
  Tabs,
  Tab,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TabContext, TabPanel } from '@material-ui/lab';

const TABS = Object.freeze({
  provisioned: {
    id: 'provisioned',
    label: 'PROVISIONED',
  },
  nonProvisioned: {
    id: 'non-provisioned',
    label: 'NON-PROVISIONED',
  },
  all: {
    id: 'all',
    label: 'ALL',
  },
});

const FanbandSelector = React.forwardRef(({ error, ...rest }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState('provisioned');

  return (
    <React.Fragment>
      <TextField
        {...rest}
        inputRef={ref}
        helperText={error}
        error={!!error}
        placeholder="Not assigned"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <KeyboardArrowDownIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        InputLabelProps={{ shrink: true }}
        onClick={(e) => setAnchorEl(e.target)}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab value={TABS.provisioned.id} label={TABS.provisioned.label} />
          <Tab
            value={TABS.nonProvisioned.id}
            label={TABS.nonProvisioned.label}
          />
          <Tab value={TABS.all.id} label={TABS.all.label} />
        </Tabs>
        <TabContext value={tab}>
          <TabPanel value={TABS.provisioned.id}></TabPanel>
          <TabPanel value={TABS.nonProvisioned.id}></TabPanel>
          <TabPanel value={TABS.all.id}></TabPanel>
        </TabContext>
      </Popover>
    </React.Fragment>
  );
});

export default FanbandSelector;
