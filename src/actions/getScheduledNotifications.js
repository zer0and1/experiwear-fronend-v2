import * as TYPES from './types';
import * as scheduleAPI from 'services/api-schedule';

const PAGE_COUNT = 5;
const getScheduledNotifications =
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

const getMoreScheduledNotifications = () => async (dispatch, getState) => {
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

export { getScheduledNotifications, getMoreScheduledNotifications };
