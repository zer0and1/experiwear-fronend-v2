export const FANBAND_TYPES = Object.freeze({
  all: 'all',
  provisioned: 'provisioned',
  nonProvisioned: 'nonProvisioned',
});

export const FANBAND_LABELS = Object.freeze({
  [FANBAND_TYPES.all]: 'ALL',
  [FANBAND_TYPES.provisioned]: 'PROVISIONED',
  [FANBAND_TYPES.nonProvisioned]: 'NON-PROVISIONED',
});

export const ALERT_PROTO_TYPES = Object.freeze({
  news: 'news',
  survey: 'survey',
  score: 'score',
  promo: 'promo',
});

export const ALERT_PROTO_LABELS = Object.freeze({
  [ALERT_PROTO_TYPES.news]: 'News',
  [ALERT_PROTO_TYPES.survey]: 'QuickPoll',
  [ALERT_PROTO_TYPES.score]: 'Score',
  [ALERT_PROTO_TYPES.promo]: 'Promo',
});

export const ALERT_MIXED_TYPES = Object.freeze({
  all: 'all',
  scheduled: 'scheduled',
  saved: 'saved',
});

export const ANSWER_ENUM = Object.freeze({
  NO: 0,
  YES: 1,
  IGNORED: 2,
});

export const GAME_STATUS = Object.freeze({
  finished: 'Finished',
  scheduled: 'Scheduled',
  inPlay: 'In Play',
});

export const WS_EVENTS = Object.freeze({
  FANBAND_IN_AREA: 'FANBAND_IN_AREA',
  FANBAND_STATUS: 'FANBAND_STATUS',
  FANBAND_REACT: 'FANBAND_REACT',
  FANBAND_ANSWER: 'FANBAND_ANSWER',
  UPCOMING_SCHEDULED_NOTIFICATION: 'UPCOMING_SCHEDULED_NOTIFICATION',
  LIVE_GAME_UPDATE: 'LIVE_GAME_UPDATE',
});

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

export const ALERT_FORM_MODES = Object.freeze({
  proto: 'proto',
  scheduled: 'scheduled',
  saved: 'saved',
});

export const LINKS = Object.freeze({
  signIn: {
    title: 'Sign In',
    path: '/auth/sign-in',
  },
  forgotPassword: {
    title: 'Forgot Password',
    path: '/auth/forgot-password',
  },
  resetPassword: {
    title: 'Reset Password',
    path: '/auth/reset-password',
  },
  home: {
    title: 'Home',
    path: '/',
  },
  selectedGame: {
    title: 'Selected Game',
    path: '/selected-game',
  },
  stats: {
    title: 'Stats',
    path: '/stats',
  },
  statsFanbands: {
    title: 'Fanbands',
    path: '/stats/fanbands',
  },
  news: {
    title: 'News',
    path: '/news',
  },
  newsSent: {
    title: 'News alerts sent',
    path: '/news/news-sent',
  },
  quickPoll: {
    title: 'Quick Poll',
    path: '/quickpoll',
  },
  quickPollSent: {
    title: 'All quick polls',
    path: '/quickpoll/quickpoll-sent',
  },
  score: {
    title: 'Score',
    path: '/score',
  },
  scoreSent: {
    title: 'Score alerts sent',
    path: '/score/score-sent',
  },
  promo: {
    title: 'Promo',
    path: '/promo',
  },
  promoSent: {
    title: 'Promo alerts sent',
    path: '/promo/promo-sent',
  },
  schedule: {
    title: 'Schedule',
    path: '/schedule',
  },
  scheduleSent: {
    title: 'Active scheduled alerts',
    path: '/schedule/schedule-sent',
  },
  accelerometer: {
    title: 'Accelerometer',
    path: '/accelerometer',
  },
  saved: {
    title: 'Saved alerts',
    path: '/saved',
  },
  savedAll: {
    title: 'Saved alerts',
    token: 'View all',
    path: '/saved/view-all',
  },
  tickets: {
    title: 'Manage Tickets',
    path: '/tickets',
  },
  ticketModify: {
    title: 'Manage Tickets',
    token: 'Modify Ticket',
    path: '/tickets/:id',
  },
});
