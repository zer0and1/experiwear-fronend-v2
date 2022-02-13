import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { DEFAULT_ALERT_PARAMS } from 'utils/constants';
import { difference, isEmpty } from 'utils/helpers';
import { SettingDialog } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
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
  colorPattern: {
    width: 16,
    height: 16,
    borderRadius: 5,
    marginRight: 4,
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

  const paramsLabel = useMemo(() => {
    const diff = difference(DEFAULT_ALERT_PARAMS(), value);

    if (isEmpty(diff)) {
      return 'Default';
    }

    const colorsTop = (
      <Box display="flex" alignItems="center">
        <div>Colors Top:&nbsp;</div>
        <div
          className={classes.colorPattern}
          style={{ background: value.topColor1 }}
        />
        <div
          className={classes.colorPattern}
          style={{ background: value.topColor2 }}
        />
        <div
          className={classes.colorPattern}
          style={{ background: value.topColor3 }}
        />
      </Box>
    );

    const colorsBottom = (
      <Box display="flex" alignItems="center">
        <div>Colors Bottom:&nbsp;</div>
        <div
          className={classes.colorPattern}
          style={{ background: value.bottomColor1 }}
        />
        <div
          className={classes.colorPattern}
          style={{ background: value.bottomColor2 }}
        />
        <div
          className={classes.colorPattern}
          style={{ background: value.bottomColor3 }}
        />
      </Box>
    );
    let topChanged = false,
      bottomChanged = false;
    return Object.keys(diff)
      .map((key) => {
        topChanged |= key.startsWith('topColor');
        bottomChanged |= key.startsWith('bottomColor');
        return key.includes('Color') ? null : (
          <Box key={key} style={{ textTransform: 'capitalize' }}>
            {key}: {diff[key]}
          </Box>
        );
      })
      .concat(
        topChanged ? colorsTop : null,
        bottomChanged ? colorsBottom : null
      );
  }, [value, classes]);

  const handleSaveAsDefault = () => {
    localStorage.setItem('default_alert_params', JSON.stringify(value));
    toggleSetting(false);
  };

  return (
    <Box className={clsx(classes.root, className)} {...boxProps}>
      <Box display="flex" justifyContent="space-between">
        <Typography className={classes.label}>{label}</Typography>
        <IconButton
          className={classes.button}
          onClick={() => toggleSetting(true)}
        >
          <OpenInNew />
        </IconButton>
      </Box>
      <Box className={classes.value}>{paramsLabel}</Box>
      <SettingDialog
        open={settingToggled}
        onClose={() => toggleSetting(false)}
        params={value}
        onChange={onChange}
        onReset={onReset}
        onSaveAsDefault={handleSaveAsDefault}
        terminalScreen={terminalScreen}
      />
    </Box>
  );
};

export default AlertField;
