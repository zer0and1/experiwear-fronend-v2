import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, RadioGroup } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ColorField, FormButton, HeaderText, SubHeaderText, PrettoSlider, Title, FanbandTerminal, ExpRadio } from 'components';
import { useCallback, useState } from 'react';
import { VIBRATION_MARKS } from './constants';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2),
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: theme.palette.grey[500],
  },
}));

const SettingDialog = ({ open, onClose }) => {
  const classes = useStyles();
  const [alertSettings, setAlertSettings] = useState({
    topLight1: '#825dde',
    topLight2: '#9ea3ba',
    topLight3: '#01a1c3',
    bottomLight1: '#ffdb3c',
    bottomLight2: '#01a1c3',
    bottomLight3: '#825dde',
    decoration: 'flashing',
    vibration: 'quick',
    duration: 9,
  });

  const handleFieldChange = useCallback((e) => {
    setAlertSettings(settings => ({
      ...settings,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  }, []);

  const handleDurationChange = useCallback((e, value) => {
    setAlertSettings(settings => ({
      ...settings,
      duration: value,
    }));
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth classes={{ paper: classes.root }}>
      <DialogTitle>
        <Title>Alert Parameters</Title>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={9}>
            <HeaderText>Led Lights</HeaderText>
            <Box mb={2}>
              <RadioGroup row name="decoration" value={alertSettings.decoration} onChange={handleFieldChange}>
                <ExpRadio label="Flashing" color="info" value="flashing" />
                <ExpRadio label="Stable" color="info" value="stable" />
              </RadioGroup>
            </Box>
            <SubHeaderText>Color palette</SubHeaderText>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ColorField
                  name="topLight1"
                  label="Top light #1"
                  value={alertSettings.topLight1}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="topLight2"
                  label="Top light #2"
                  value={alertSettings.topLight2}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="topLight3"
                  label="Top light #3"
                  value={alertSettings.topLight3}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="bottomLight1"
                  label="Bottom light #1"
                  value={alertSettings.bottomLight1}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="bottomLight2"
                  label="Bottom light #2"
                  value={alertSettings.bottomLight2}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="bottomLight3"
                  label="Bottom light #3"
                  value={alertSettings.bottomLight3}
                  onChange={handleFieldChange}
                />
              </Grid>
            </Grid>

            <HeaderText>Vibration</HeaderText>

            <SubHeaderText>Duration</SubHeaderText>
            <PrettoSlider
              name="duration"
              min={1}
              max={20}
              step={1}
              marks={VIBRATION_MARKS}
              value={alertSettings.duration}
              onChange={handleDurationChange}
            />

            <SubHeaderText>Style</SubHeaderText>
            <Box mb={2}>
              <RadioGroup row name="vibration" value={alertSettings.vibration} onChange={handleFieldChange}>
                <ExpRadio label="Quick bursts" color="info" value="quick" />
                <ExpRadio label="Long vibrate" color="info" value="long" />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item xs={3} container justify="flex-end">
            <FanbandTerminal {...alertSettings} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <FormButton color="secondary">
          Reset to default
        </FormButton>
      </DialogActions>
    </Dialog>
  );
};

export default SettingDialog;