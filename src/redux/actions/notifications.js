import * as TYPES from './types';
import * as fanbandsAPI from 'services/api-fanband';
import * as notificationsAPI from 'services/api-notifications';
import { ALERT_TYPES } from 'utils/constants/alert-types';
import { isEmpty } from 'utils/helpers/utility';

export const getAccelerometerData = (notificationId) => async (dispatch) => {
  try {
    const params = {
      notificationId,
      skip: 0,
      take: 100,
    };

    const { results, total } = await accelerometerAPI.getAccelerometerData(
      params
    );
    await dispatch({
      type: TYPES.SET_ACC_DATA,
      payload: {
        results,
        total,
      },
    });
  } catch (error) {
    console.log('[getAccelerometerData] error => ', error);
  }
};

const PAGE_COUNT = 5;
export const getCannedNotifications =
  (take = PAGE_COUNT) =>
  async (dispatch) => {
    try {
      const params = {
        skip: 0,
        take,
      };

      const { results, total } = await cannedAPI.getCanneds(params);
      await dispatch({
        type: TYPES.SET_CANNED_NOTIFICATIONS,
        payload: {
          results,
          total,
        },
      });
    } catch (error) {
      console.log('[getCannedNotifications] error => ', error);
    }
  };

export const getMoreCannedNotifications = () => async (dispatch, getState) => {
  try {
    const {
      notifications: {
        canned: { results: preResults },
      },
    } = getState();
    const params = {
      skip: preResults.length,
      take: PAGE_COUNT,
    };

    const { results, total } = await cannedAPI.getCanneds(params);
    await dispatch({
      type: TYPES.SET_CANNED_NOTIFICATIONS,
      payload: {
        results: [...preResults, ...results],
        total,
      },
    });
  } catch (error) {
    console.log('[getMoreCannedNotifications] error => ', error);
  }
};

export const getFanbandsStatistics =
  (refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        fanbands: { statistics },
      } = getState();
      if (!refresh && !isEmpty(statistics)) {
        return;
      }

      const response = await fanbandsAPI.getFanbandsStatistics();
      await dispatch({
        type: TYPES.FETCH_FANBANDS_STATISTICS,
        payload: response,
      });
    } catch (error) {
      console.log('[getFanbandsStatistics] error => ', error);
    }
  };

export const updateFanbandsStatistics = (statistics) => {
  return {
    type: TYPES.UPDATE_FANBANDS_STATISTICS,
    payload: statistics,
  };
};

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
        type: ALERT_TYPES.NEWS.VALUE,
        isSent: true,
        skip: 0,
        take: 10,
      };
      const { results = [] } = await notificationsAPI.getNotifications(params);

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

export const setLatestNotification =
  (type, notification) => async (dispatch) => {
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
      const { results = [], total = 0 } =
        await notificationsAPI.getNotifications(params);

      await dispatch({
        type: TYPES.SET_NOTIFICATIONS,
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
    const { results = [], total = 0 } = await notificationsAPI.getNotifications(
      params
    );

    await dispatch({
      type: TYPES.SET_NOTIFICATIONS,
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
        type: TYPES.SET_NOTIFICATIONS,
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

export const getScheduledNotifications =
  (take = PAGE_COUNT) =>
  async (dispatch) => {
    try {
      const params = {
        skip: 0,
        take,
      };

      const { results, total } = await scheduleAPI.getScheduledNotifications(
        params
      );
      await dispatch({
        type: TYPES.SET_SCHEDULED_NOTIFICATIONS,
        payload: {
          results,
          total,
        },
      });
    } catch (error) {
      console.log('[getScheduledNotifications] error => ', error);
    }
  };

export const getMoreScheduledNotifications =
  () => async (dispatch, getState) => {
    try {
      const {
        notifications: {
          scheduled: { results: preResults },
        },
      } = getState();
      const params = {
        skip: preResults.length,
        take: PAGE_COUNT,
      };

      const { results, total } = await scheduleAPI.getScheduledNotifications(
        params
      );
      await dispatch({
        type: TYPES.SET_SCHEDULED_NOTIFICATIONS,
        payload: {
          results: [...preResults, ...results],
          total,
        },
      });
    } catch (error) {
      console.log('[getMoreScheduledNotifications] error => ', error);
    }
  };
