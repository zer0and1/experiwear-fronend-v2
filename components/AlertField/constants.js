export const VIBRATION_STYLES = Object.freeze({
  quickBursts: '0.05',
  longVibrate: '0.12',
});

export const VIBRATION_INTENSITIES = Object.freeze({
  no: '0',
  low: '1',
  medium: '2',
  high: '3',
});

export const LED_LIGHTS = Object.freeze({
  flashing: '1',
  stable: '2',
});

export const DEFAULT_PARAMS = Object.freeze({
  topLight1: '#825dde',
  topLight2: '#9ea3ba',
  topLight3: '#01a1c3',
  bottomLight1: '#ffdb3c',
  bottomLight2: '#01a1c3',
  bottomLight3: '#825dde',
  vibIntensity: VIBRATION_INTENSITIES.medium,
  vibStyle: VIBRATION_STYLES.quickBursts,
  vibDuration: 9,
  ledLight: LED_LIGHTS.flashing,
});