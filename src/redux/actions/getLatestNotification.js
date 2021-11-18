import * as TYPES from './types';
import * as notificationsAPI from 'services/api-notifications';
import { ALERT_TYPES } from 'utils/constants/alert-types';

const getLatestNotification = (type) => async (dispatch) => {
  try {
    const response = await notificationsAPI.getLatestNotification({ type });
    let actionType = TYPES.SET_LATEST_NOTIFICATION;

    switch (type) {
      case ALERT_TYPES.SURVEY.VALUE:
        actionType = TYPES.SET_LATEST_SURVEY_NOTIFICATION;
        break;
      default:
        actionType = TYPES.SET_LATEST_NOTIFICATION;
        break;
    }

    await dispatch({
      type: actionType,
      payload: response,
    });
  } catch (error) {
    console.log('[getLatestNotification] error => ', error);
  }
};

const setLatestNotification = (type, notification) => async (dispatch) => {
  try {
    let actionType = TYPES.SET_LATEST_NOTIFICATION;
    switch (type) {
      case ALERT_TYPES.SURVEY.VALUE:
        actionType = TYPES.SET_LATEST_SURVEY_NOTIFICATION;
        break;
      default:
        actionType = TYPES.SET_LATEST_NOTIFICATION;
        break;
    }

    await dispatch({
      type: actionType,
      payload: notification,
    });
  } catch (error) {
    console.log('[setLatestNotification] error => ', error);
  }
};

export { getLatestNotification, setLatestNotification };
