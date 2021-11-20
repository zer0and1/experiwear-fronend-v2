import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  RadioGroup,
} from '@material-ui/core';
import {
  ColorField,
  FormButton,
  HeaderText,
  SubHeaderText,
  PrettoSlider,
  Title,
  FanbandTerminal,
  ExpRadio,
} from 'components';
import { VIBRATION_MARKS } from './constants';
import CloseIcon from '@material-ui/icons/Close';
import {
  LED_TYPES,
  VIB_INTENSITIES,
  VIB_TYPES,
} from 'components/elements/AlertField';

const useStyles = makeStyles((theme) => ({
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

const SettingDialog = ({
  open,
  onClose,
  params,
  terminalScreen,
  onChange,
  onReset,
}) => {
  const classes = useStyles();

  const handleDurationChange = useCallback(
    (e, value) => {
      onChange({ target: { value, name: 'duration', type: 'slider' } });
    },
    [onChange]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      classes={{ paper: classes.root }}
    >
      <DialogTitle>
        <Title>Alert Parameters</Title>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={9}>
            <SubHeaderText>Duration</SubHeaderText>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <PrettoSlider
                  name="duration"
                  min={1}
                  max={20}
                  step={1}
                  marks={VIBRATION_MARKS}
                  value={params.duration}
                  onChange={handleDurationChange}
                />
              </Grid>
            </Grid>

            <HeaderText>Led Lights</HeaderText>
            <Box mb={2}>
              <RadioGroup
                row
                name="ledType"
                value={params.ledType}
                onChange={onChange}
              >
                <ExpRadio
                  label="Flashing"
                  color="info"
                  value={LED_TYPES.flashing}
                />
                <ExpRadio
                  label="Stable"
                  color="info"
                  value={LED_TYPES.stable}
                />
              </RadioGroup>
            </Box>
            <SubHeaderText>Color palette</SubHeaderText>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ColorField
                  name="topColor1"
                  label="Top light #1"
                  value={params.topColor1}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="topColor2"
                  label="Top light #2"
                  value={params.topColor2}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="topColor3"
                  label="Top light #3"
                  value={params.topColor3}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="bottomColor1"
                  label="Bottom light #1"
                  value={params.bottomColor1}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="bottomColor2"
                  label="Bottom light #2"
                  value={params.bottomColor2}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorField
                  name="bottomColor3"
                  label="Bottom light #3"
                  value={params.bottomColor3}
                  onChange={onChange}
                />
              </Grid>
            </Grid>

            <HeaderText>Vibration</HeaderText>

            <SubHeaderText>Intensity</SubHeaderText>
            <Box mb={2}>
              <RadioGroup
                row
                name="vibrationIntensity"
                value={params.vibrationIntensity}
                onChange={onChange}
              >
                <ExpRadio
                  label="No Vibration"
                  color="info"
                  value={VIB_INTENSITIES.no}
                />
                <ExpRadio
                  label="Low"
                  color="info"
                  value={VIB_INTENSITIES.low}
                />
                <ExpRadio
                  label="Medium"
                  color="info"
                  value={VIB_INTENSITIES.medium}
                />
                <ExpRadio
                  label="High"
                  color="info"
                  value={VIB_INTENSITIES.high}
                />
              </RadioGroup>
            </Box>

            <SubHeaderText>Style</SubHeaderText>
            <Box mb={2}>
              <RadioGroup
                row
                name="vibrationType"
                value={params.vibrationType}
                onChange={onChange}
              >
                <ExpRadio
                  label="Quick bursts"
                  color="info"
                  value={VIB_TYPES.quickBursts}
                />
                <ExpRadio
                  label="Long vibrate"
                  color="info"
                  value={VIB_TYPES.longVibrate}
                />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item xs={3} container justifyContent="flex-end">
            <FanbandTerminal params={params}>{terminalScreen}</FanbandTerminal>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <FormButton color="secondary" onClick={onReset}>
          Reset to default
        </FormButton>
      </DialogActions>
    </Dialog>
  );
};

export default SettingDialog;
