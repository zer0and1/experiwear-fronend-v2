import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { SettingDialog } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  label: {
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: theme.spacing(2),
    color: '#444',
    letterSpacing: 0.1,
  },
  value: {
    fontFamily: theme.custom.SFProTextRegular,
    fontSize: 15,
    letterSpacing: -0.24,
    color: 'rgba(60, 60, 67, 0.6)',
  },
  button: {
    margin: -12,
  },
}));

const AlertField = ({
  label = 'Alert Parameters',
  value,
  terminalScreen,
  onChange,
  onReset,
  className,
  ...boxProps
}) => {
  const classes = useStyles();
  const [settingToggled, toggleSetting] = useState(false);

  const handleSettingClose = useCallback(() => toggleSetting(false), []);
  const handleToggleSetting = useCallback(() => toggleSetting(true), []);

  return (
    <Box className={clsx(classes.root, className)} {...boxProps}>
      <Box>
        <Typography className={classes.label}>{label}</Typography>
        <Typography className={classes.value}>Default</Typography>
      </Box>
      <IconButton className={classes.button} onClick={handleToggleSetting}>
        <OpenInNew />
      </IconButton>
      <SettingDialog
        open={settingToggled}
        onClose={handleSettingClose}
        params={value}
        onChange={onChange}
        onReset={onReset}
        terminalScreen={terminalScreen}
      />
    </Box>
  );
};

export default AlertField;
