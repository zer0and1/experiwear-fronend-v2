import * as alertsAPI from 'services/api-alerts';
import * as TYPES from 'redux/actionTypes';
import { createAction } from 'redux-actions';
import { ALERT_MIXED_TYPES, ALERT_PROTO_TYPES } from 'utils/constants';
import { isEmpty } from 'utils/helpers/utility';
import { setLoadingStatus } from './auxiliary';
import { setResponseSuccess, setResponseError } from '.';

export const createAlert =
  (type, data, scheduledTime = null) =>
  async (dispatch) => {
    dispatch(setLoadingStatus(true));

    try {
      let response;

      if (scheduledTime) {
        response = await alertsAPI.createScheduledNotification({
          ...data,
          type,
          scheduledTime,
        });
      } else {
        response = await alertsAPI.createNotification({ ...data, type });
      }

      dispatch(
        getNotifications(scheduledTime ? ALERT_MIXED_TYPES.scheduled : type)
      );

      dispatch(setResponseSuccess(response));
    } catch (e) {
      dispatch(setResponseError(e));
    }

    dispatch(setLoadingStatus(false));
  };

export const insertSavedAlert = (type, data) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.createSavedAlert({ ...data, type });
    dispatch(setResponseSuccess(response));
    dispatch(getSavedAlerts());
  } catch (e) {
    dispatch(setResponseError(e));
  }

  dispatch(setLoadingStatus(false));
};

export const sendSavedAlert = (id) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.sendSavedAlert(id);
    dispatch(setResponseSuccess(response));
  } catch (e) {
    dispatch(setResponseError(e));
  }

  dispatch(setLoadingStatus(false));
};

export const modifySavedAlert = (id, params) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.updateSavedAlert(id, params);
    dispatch(setResponseSuccess(response));
    dispatch(getSavedAlerts());
  } catch (e) {
    dispatch(setResponseError(e));
  }

  dispatch(setLoadingStatus(false));
};

export const removeSavedAlert = (id) => async (dispatch) => {
  dispatch(setLoadingStatus(true));

  try {
    const response = await alertsAPI.deleteSavedAlert(id);
    await dispatch(getSavedAlerts());
    dispatch(setResponseSuccess(response));
  } catch (e) {
    dispatch(setResponseError(e));
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
    dispatch(setResponseError(error));
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
      dispatch(setResponseError(error));
    }
  };

export const setAlerts = createAction(TYPES.SET_ALERTS, (payload) => payload);

export const getSavedAlerts = (params) => async (dispatch) => {
  try {
    const res = await alertsAPI.getNotifications({ ...params, isSaved: true });
    dispatch(setAlerts({ ...res, type: ALERT_MIXED_TYPES.saved }));
  } catch (e) {
    dispatch(setResponseError(e));
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
      dispatch(setResponseError(error));
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
    dispatch(setResponseError(error));
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
      dispatch(setResponseError(error));
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
