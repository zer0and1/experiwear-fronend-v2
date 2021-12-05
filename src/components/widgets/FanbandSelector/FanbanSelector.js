import React, { useMemo, useState } from 'react';
import {
  TextField,
  InputAdornment,
  Popover,
  Tabs,
  Tab,
  MenuList,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TabContext, TabPanel } from '@material-ui/lab';
import { useAsyncAction } from 'hooks';
import { getFanbands } from 'redux/actions';
import { useSelector } from 'react-redux';
import { FANBAND_LABELS, FANBAND_TYPES } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  item: {
    fontFamily: theme.custom.fonts.SFProTextBold,
    fontSize: 14,
    color: '#000',
    '&>span': {
      fontFamily: theme.custom.fonts.SFProTextRegular,
    },
  },
  hidden: {
    display: 'none',
  },
}));

const FanbandSelector = React.forwardRef(({ error, label, ...rest }, ref) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tab, setTab] = useState(FANBAND_TYPES.provisioned);
  const [fanbandLabel, setFanbandLabel] = useState('');
  const fanbands = useSelector((state) => state.fanbands.results);
  const provisionedFanbands = useMemo(
    () => fanbands.filter((f) => f.phone),
    [fanbands]
  );
  const nonProvisionedFanbands = useMemo(
    () => fanbands.filter((f) => !f.phone),
    [fanbands]
  );

  const handleClick = ({ id, name, phone }) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;
    nativeInputValueSetter.call(ref.current, id);
    const ev1 = new Event('input', { bubbles: true });
    ref.current.dispatchEvent(ev1);
    setAnchorEl(null);
    setFanbandLabel(`${name} ∙ Phone: ${phone}`);
  };

  const FanbandTabPanel = ({ fanbands = [] }) => (
    <MenuList>
      {fanbands.map((f) => (
        <MenuItem
          key={f.id}
          className={classes.item}
          onClick={() => handleClick(f)}
          selected={f.id === rest.value}
        >
          {f.name}
          <span>&nbsp;{` ∙ Phone: ${f.phone}`}</span>
        </MenuItem>
      ))}
    </MenuList>
  );

  useAsyncAction(getFanbands(), !fanbands.length);

  return (
    <React.Fragment>
      <TextField
        label={label}
        helperText={error}
        error={!!error}
        value={rest.value && fanbandLabel}
        placeholder="Not assigned"
        fullWidth
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
      <TextField inputRef={ref} {...rest} className={classes.hidden} />
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
          <Tab
            value={FANBAND_TYPES.provisioned}
            label={FANBAND_LABELS.provisioned}
          />
          <Tab
            value={FANBAND_TYPES.nonProvisioned}
            label={FANBAND_LABELS.nonProvisioned}
          />
          <Tab value={FANBAND_TYPES.all} label={FANBAND_LABELS.all} />
        </Tabs>
        <TabContext value={tab}>
          <TabPanel value={FANBAND_TYPES.provisioned}>
            <FanbandTabPanel fanbands={provisionedFanbands} />
          </TabPanel>
          <TabPanel value={FANBAND_TYPES.nonProvisioned}>
            <FanbandTabPanel fanbands={nonProvisionedFanbands} />
          </TabPanel>
          <TabPanel value={FANBAND_TYPES.all}>
            <FanbandTabPanel fanbands={fanbands} />
          </TabPanel>
        </TabContext>
      </Popover>
    </React.Fragment>
  );
});

export default FanbandSelector;
