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
  gameday: 'gameday',
});

export const ALERT_PROTO_LABELS = Object.freeze({
  [ALERT_PROTO_TYPES.news]: 'News',
  [ALERT_PROTO_TYPES.survey]: 'QuickPoll',
  [ALERT_PROTO_TYPES.score]: 'Score',
  [ALERT_PROTO_TYPES.promo]: 'Promo',
  [ALERT_PROTO_TYPES.gameday]: 'Gameday',
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
  scheduled: 1,
  inProgress: 2,
  finished: 3,
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

export const DEFAULT_ALERT_PARAMS = () => {
  if (typeof window !== 'undefined') {
    const localData = localStorage.getItem('default_alert_params');

    if (localData) {
      return JSON.parse(localData);
    }
  }

  return Object.freeze({
    topColor1: 'rgb(255,0,0)',
    topColor2: 'rgb(255,0,0)',
    topColor3: 'rgb(255,0,0)',
    bottomColor1: 'rgb(255,0,0)',
    bottomColor2: 'rgb(255,0,0)',
    bottomColor3: 'rgb(255,0,0)',
    vibrationIntensity: VIB_INTENSITIES.medium,
    vibrationType: VIB_TYPES.quickBursts,
    duration: 3,
    ledType: LED_TYPES.flashing,
  });
};

export const ALERT_FORM_MODES = Object.freeze({
  proto: 'proto',
  scheduled: 'scheduled',
  saved: 'saved',
});

export const LINKS = Object.freeze({
  signIn: {
    title: 'Sign In',
    path: '/auth/sign-in',
    protected: false,
  },
  forgotPassword: {
    title: 'Forgot Password',
    path: '/auth/forgot-password',
    protected: false,
  },
  resetPassword: {
    title: 'Reset Password',
    path: '/auth/reset-password',
    protected: false,
  },
  home: {
    title: 'Home',
    path: '/',
    protected: true,
  },
  selectedGame: {
    title: 'Selected Game',
    path: '/selected-game',
    protected: true,
  },
  stats: {
    title: 'Stats',
    path: '/stats',
    protected: true,
  },
  statsFanbands: {
    title: 'Fanbands',
    path: '/stats/fanbands',
    protected: true,
  },
  news: {
    title: 'News',
    path: '/news',
    protected: true,
  },
  newsSent: {
    title: 'News alerts sent',
    path: '/news/news-sent',
    protected: true,
  },
  quickPoll: {
    title: 'Quick Poll',
    path: '/quickpoll',
    protected: true,
  },
  quickPollSent: {
    title: 'All quick polls',
    path: '/quickpoll/quickpoll-sent',
    protected: true,
  },
  score: {
    title: 'Score',
    path: '/score',
    protected: true,
  },
  scoreSent: {
    title: 'Score alerts sent',
    path: '/score/score-sent',
    protected: true,
  },
  promo: {
    title: 'Promo',
    path: '/promo',
    protected: true,
  },
  promoSent: {
    title: 'Promo alerts sent',
    path: '/promo/promo-sent',
    protected: true,
  },
  schedule: {
    title: 'Schedule',
    path: '/schedule',
    protected: true,
  },
  scheduleSent: {
    title: 'Active scheduled alerts',
    path: '/schedule/schedule-sent',
    protected: true,
  },
  gameday: {
    title: 'Gameday Theme',
    path: '/gameday-theme',
    protected: true,
  },
  saved: {
    title: 'Saved alerts',
    path: '/saved',
    protected: true,
  },
  savedAll: {
    title: 'Saved alerts',
    token: 'View all',
    path: '/saved/view-all',
    protected: true,
  },
  savedEdit: {
    title: 'Edit Saved alert',
    token: 'Edit',
    path: '/saved/:id',
    protected: true,
  },
  tickets: {
    title: 'Manage Tickets',
    path: '/tickets',
    protected: true,
  },
  ticketModify: {
    title: 'Manage Tickets',
    token: 'Modify Ticket',
    path: '/tickets/:id',
    protected: true,
  },
});
