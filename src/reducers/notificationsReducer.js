import * as TYPES from 'actions/types';
import moment from 'moment';
import _ from 'lodash';

const INITIAL_STATE = Object.freeze({
  all: {
    results: [],
    total: 0,
  },
  news: {
    results: [],
    total: 0,
  },
  survey: {
    results: [],
    total: 0,
  },
  score: {
    results: [],
    total: 0,
  },
  promo: {
    results: [],
    total: 0,
  },
  scheduled: {
    results: [],
    total: 0,
  },
  canned: {
    results: [],
    total: 0,
  },
  latest: {},
  latestSurvey: {},
  latestNews: [],
  selectedDate: new Date(),
  alertStatus: {},
  alertsToShow: {
    news: true,
    survey: true,
    score: true,
    promo: true,
  },
});

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_ALL_NOTIFICATIONS:
      const grouped = _.groupBy(
        action.payload.results.map((n) => ({
          ...n,
          date: moment(n.createdAt).format('YYYY-MM-DD'),
        })),
        'date'
      );

      for (let date in grouped) {
        grouped[date] = grouped[date].reduce(
          (acc, n) => ({
            ...acc,
            [n.type]: true,
          }),
          {}
        );
      }

      return { ...state, all: action.payload, alertStatus: grouped };
    case TYPES.SET_NEWS_NOTIFICATIONS:
      return { ...state, news: action.payload };
    case TYPES.SET_SURVEY_NOTIFICATIONS:
      return { ...state, survey: action.payload };
    case TYPES.SET_SCORE_NOTIFICATIONS:
      return { ...state, score: action.payload };
    case TYPES.SET_PROMO_NOTIFICATIONS:
      return { ...state, promo: action.payload };
    case TYPES.SET_SCHEDULED_NOTIFICATIONS:
      return { ...state, scheduled: action.payload };
    case TYPES.SET_CANNED_NOTIFICATIONS:
      return { ...state, canned: action.payload };
    case TYPES.SET_LATEST_NOTIFICATION:
      return { ...state, latest: action.payload };
    case TYPES.SET_LATEST_SURVEY_NOTIFICATION:
      return { ...state, latestSurvey: action.payload };
    case TYPES.SET_LATEST_NEWS_NOTIFICATIONS:
      return { ...state, latestNews: action.payload };
    case TYPES.SELECT_DATE:
      return { ...state, selectedDate: action.payload };
    case TYPES.SET_ALERT_TO_SHOW:
      const { alert, visibility } = action.payload;
      const { alertsToShow } = state;
      return {
        ...state,
        alertsToShow: { ...alertsToShow, [alert]: visibility },
      };
    default:
      return state;
  }
};

export default notificationsReducer;
