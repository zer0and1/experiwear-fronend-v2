export const VIB_TYPES = Object.freeze({
  quickBursts: 'quickBursts',
  longVibrate: 'longVibrate',
});

export const VIB_INTENSITIES = Object.freeze({
  no: 'noVibration',
  low: 'low',
  medium: 'medium',
  high: 'high',
});

export const LED_TYPES = Object.freeze({
  flashing: 'flashing',
  stable: 'stable',
});

export const DEFAULT_ALERT_PARAMS = Object.freeze({
  topColor1: 'rgb(130,93,222)',
  topColor2: 'rgb(158,163,186)',
  topColor3: 'rgb(1,161,195)',
  bottomColor1: 'rgb(255,219,60)',
  bottomColor2: 'rgb(1,161,195)',
  bottomColor3: 'rgb(130,93,222)',
  vibrationIntensity: VIB_INTENSITIES.medium,
  vibrationType: VIB_TYPES.quickBursts,
  duration: 3,
  ledType: LED_TYPES.flashing,
});
