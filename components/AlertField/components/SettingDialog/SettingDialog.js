import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Checkbox, ColorField, FormButton, HeaderText, SubHeaderText, PrettoSlider, Title } from 'components';
import { useCallback, useState } from 'react';

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
  });

  const handleFieldChange = useCallback(e => {
    setAlertSettings(settings => ({
      ...settings,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
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
          <Grid item xs={8}>
            <HeaderText>Led Lights</HeaderText>
            <Box mb={2}>
              <Checkbox label="Flashing" color="info" name="flashing" checked={alertSettings.flashing} onChange={handleFieldChange} />
              <Checkbox label="Stable" color="info" name="stable" checked={alertSettings.stable} onChange={handleFieldChange} />
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
            <PrettoSlider marks={[{ value: 0, label: '1s' }, { value: 100, label: '20s' }]} />

            <SubHeaderText>Style</SubHeaderText>
            <Box mb={2}>
              <Checkbox label="Quick bursts" color="info" name="quickBursts" checked={alertSettings.quickBursts} onChange={handleFieldChange} />
              <Checkbox label="Long vibrate" color="info" name="longVibrate" checked={alertSettings.longVibrate} onChange={handleFieldChange} />
            </Box>
          </Grid>
          <Grid item xs={4}>
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