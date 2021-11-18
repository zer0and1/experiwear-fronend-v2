import AlertDealIcon from 'components/icons/AlertDealIcon';
import AlertScheduledIcon from 'components/icons/AlertScheduledIcon';
import AlertScoreIcon from 'components/icons/AlertScoreIcon';
import AlertSurveyIcon from 'components/icons/AlertSurveyIcon';
import { ALERT_TYPES } from 'utils/constants/alert-types';

const getAlertIcon = (type) => {
  switch (type) {
    case ALERT_TYPES.NEWS.VALUE:
      return {
        icon: AlertDealIcon,
        title: 'News Alert',
      };

    case ALERT_TYPES.SCORE.VALUE:
      return {
        icon: AlertScoreIcon,
        title: 'Survey Alert',
      };
    case ALERT_TYPES.SURVEY.VALUE:
      return {
        icon: AlertSurveyIcon,
        title: 'Survey Alert',
      };
    case ALERT_TYPES.PROMO.VALUE:
      return {
        icon: AlertScheduledIcon,
        title: 'Promo Alert',
      };
    default:
      return {
        icon: AlertDealIcon,
        title: 'News Alert',
      };
  }
};

export default getAlertIcon;
