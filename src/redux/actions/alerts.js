import * as alertsAPI from 'services/api-alerts';
import * as TYPES from '../action-types';
import { createAction } from 'redux-actions';
import { ALERT_MIXED_TYPES, ALERT_PROTO_TYPES } from 'utils/constants';
import { isEmpty } from 'utils/helpers/utility';
import { setLoadingStatus } from './auxiliary';
import { showErrorToast, showSuccessToast } from 'utils/helpers';
import { setError } from '.';

const makeFormData = (type, data) => {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('title', data.title);
  formData.append('body', data.body);
  formData.append('ledType', data.ledType);
  formData.append('topColor1', data.topColor1);
  formData.append('topColor2', data.topColor2);
  formData.append('topColor3', data.topColor3);
  formData.append('bottomColor1', data.bottomColor1);
  formData.append('bottomColor2', data.bottomColor2);
  formData.append('bottomColor3', data.bottomColor3);
  formData.append('vibrationType', data.vibrationType);
  formData.append('vibrationIntensity', data.vibrationIntensity);
  formData.append('duration', data.duration);
  formData.append('file', data.image);
  formData.append('responses', data.responses);

  return formData;
};

export const createAlert =
  (type, data, scheduledTime = null) =>
  async (dispatch) => {
    dispatch(setLoadingStatus(true));

    const formData = makeFormData(type, data);

    try {
      let response;

      if (scheduledTime) {
        formData.append('scheduledTime', scheduledTime);
        response = await alertsAPI.createScheduledNotification(formData);
      } else {
        response = await alertsAPI.createNotification(formData);
      }

      dispatch(
        getNotifications(scheduledTime ? ALERT_MIXED_TYPES.scheduled : type)
      );

      showSuccessToast(response.message);
    } catch (e) {
      showErrorToast(e.response?.data?.message?.[0]);
    }

    dispatch(setLoadingStatus(false));
  };

export const insertSavedAlert = (type, data) => async (dispatch) => {
  dispatch(setLoadingStatus(true));
  const formData = makeFormData(type, data);

  try {
    const { message } = await alertsAPI.createSavedAlert(formData);
    showSuccessToast(message);
    dispatch(getSavedAlerts());
  } catch (e) {
    showErrorToast(e.response?.data?.message?.[0]);
  }

  dispatch(setLoadingStatus(false));
};

const PAGE_COUNT = 5;
export const getLatestNewsNotifications =
  (refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        notifications: { latestNews },
      } = getState();
      if (!refresh && !isEmpty(latestNews)) {
        return;
      }

      const params = {
        type: ALERT_PROTO_TYPES.news,
        isSent: true,
        skip: 0,
        take: 10,
      };
      const { results = [] } = await alertsAPI.getNotifications(params);

      await dispatch({
        type: TYPES.SET_LATEST_NEWS_NOTIFICATIONS,
        payload: results,
      });
    } catch (error) {
      console.log('[getLatestNewsNotifications] error => ', error);
    }
  };

export const getLatestNotification = (type) => async (dispatch) => {
  try {
    const response = await alertsAPI.getLatestNotification({ type });
    let actionType = TYPES.SET_LATEST_NOTIFICATION;

    switch (type) {
      case ALERT_PROTO_TYPES.survey:
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

export const setLatestNotification =
  (type, notification) => async (dispatch) => {
    try {
      let actionType = TYPES.SET_LATEST_NOTIFICATION;
      switch (type) {
        case ALERT_PROTO_TYPES.survey:
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

export const setAlerts = createAction(TYPES.SET_ALERTS, (payload) => payload);

export const getSavedAlerts = (params) => async (dispatch) => {
  try {
    const res = await alertsAPI.readSavedAlerts(params);
    dispatch(setAlerts({ ...res, type: ALERT_MIXED_TYPES.saved }));
  } catch (e) {
    dispatch(setError(e));
  }
};

export const getNotifications =
  (type = '', take = PAGE_COUNT) =>
  async (dispatch) => {
    try {
      let params = {};
      if (!!type) {
        params = {
          type,
          isSent: true,
          skip: 0,
          take,
        };
      }
      const { results = [], total = 0 } = await (type ===
        ALERT_MIXED_TYPES.scheduled
        ? alertsAPI.getScheduledNotifications
        : alertsAPI.getNotifications)(params);

      await dispatch({
        type: TYPES.SET_ALERTS,
        payload: {
          results,
          total,
          type,
        },
      });
    } catch (error) {
      console.log('[getNotifications] error => ', error);
    }
  };

export const getMoreNotifications = (type) => async (dispatch, getState) => {
  try {
    const { notifications } = getState();
    const { results: preResults = [] } = notifications[type];

    const params = {
      type,
      isSent: true,
      skip: preResults.length,
      take: PAGE_COUNT,
    };
    const { results = [], total = 0 } = await alertsAPI.getNotifications(
      params
    );

    await dispatch({
      type: TYPES.SET_ALERTS,
      payload: {
        results: [...preResults, ...results],
        total,
        type,
      },
    });
  } catch (error) {
    console.log('[getMoreNotifications] error => ', error);
  }
};

export const setNotifications =
  (type = '', results = []) =>
  async (dispatch, getState) => {
    try {
      const { notifications } = getState();
      const { total = 0 } = notifications[type];

      await dispatch({
        type: TYPES.SET_ALERTS,
        payload: {
          results,
          total,
          type,
        },
      });
    } catch (error) {
      console.log('[setNotifications] error => ', error);
    }
  };

export const setSelectedDate = (date) => ({
  type: TYPES.SELECT_DATE,
  payload: date,
});

export const setAlertToShow = (alert, visibility) => ({
  type: TYPES.SET_ALERT_TO_SHOW,
  payload: { alert, visibility },
});
