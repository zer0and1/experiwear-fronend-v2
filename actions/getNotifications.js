
import * as TYPES from './types'
import * as notificationsAPI from 'services/api-notifications'
import { ALERT_TYPES } from 'utils/constants/alert-types'

const PAGE_COUNT = 5;
const getActionType = (type) => {
  switch (type) {
    case ALERT_TYPES.NEWS.VALUE:
      return TYPES.SET_NEWS_NOTIFICATIONS;
    case ALERT_TYPES.SURVEY.VALUE:
      return TYPES.SET_SURVEY_NOTIFICATIONS;
    case ALERT_TYPES.SCORE.VALUE:
      return TYPES.SET_SCORE_NOTIFICATIONS;
    case ALERT_TYPES.PROMO.VALUE:
      return TYPES.SET_PROMO_NOTIFICATIONS;
    default:
      return TYPES.SET_ALL_NOTIFICATIONS;
  }
}

export const getNotifications = (type = '', take = PAGE_COUNT) => async (dispatch) => {
  try {
    let params = {};
    if (!!type) {
      params = {
        type,
        isSent: true,
        skip: 0,
        take
      }
    }
    const { results = [], total = 0 } = await notificationsAPI.getNotifications(params)

    await dispatch({
      type: getActionType(type),
      payload: {
        results,
        total
      }
    });
  } catch (error) {
    console.log('[getNotifications] error => ', error);
  }
};

export const getMoreNotifications = (type) => async (dispatch, getState) => {
  try {
    const { notifications } = getState();
    const { results: preResults = [] } = notifications[type]

    const params = {
      type,
      isSent: true,
      skip: preResults.length,
      take: PAGE_COUNT
    }
    const { results = [], total = 0 } = await notificationsAPI.getNotifications(params)

    await dispatch({
      type: getActionType(type),
      payload: {
        results: [
          ...preResults,
          ...results
        ],
        total
      }
    });
  } catch (error) {
    console.log('[getMoreNotifications] error => ', error);
  }
};

export const setNotifications = (type = '', results = []) => async (dispatch, getState) => {
  try {
    const { notifications } = getState();
    const { total = 0 } = notifications[type]

    await dispatch({
      type: getActionType(type),
      payload: {
        results,
        total
      }
    });
  } catch (error) {
    console.log('[setNotifications] error => ', error);
  }
};

export const setSelectedDate = (date) => ({
  type: TYPES.SELECT_DATE,
  payload: date,
});
