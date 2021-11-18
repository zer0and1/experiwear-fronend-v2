import LINKS from 'utils/constants/links';

const ALERT_TYPES = {
  NEWS: {
    LABEL: 'News',
    VALUE: 'news',
    HREF: LINKS.NEWS.HREF,
  },
  QUICKPOLL: {
    LABEL: 'Quick Poll',
    VALUE: 'survey',
    HREF: LINKS.QUICKPOLL.HREF,
  },
  SCORE: {
    LABEL: 'Score',
    VALUE: 'score',
    HREF: LINKS.SCORE.HREF,
  },
  PROMO: {
    LABEL: 'Promo',
    VALUE: 'promo',
    HREF: LINKS.PROMO.HREF,
  },
};

const ALERT_TYPES_ARRAY = [
  ALERT_TYPES.NEWS,
  ALERT_TYPES.QUICKPOLL,
  ALERT_TYPES.SURVEY,
  ALERT_TYPES.SCORE,
  ALERT_TYPES.PROMO,
];

const ANSWER_ENUM = {
  NO: 0,
  YES: 1,
  IGNORED: 2,
};

export { ALERT_TYPES, ALERT_TYPES_ARRAY, ANSWER_ENUM };
