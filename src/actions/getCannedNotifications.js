import * as TYPES from './types';
import * as cannedAPI from 'services/api-canned';

const PAGE_COUNT = 5;
const getCannedNotifications =
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

const getMoreCannedNotifications = () => async (dispatch, getState) => {
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

export { getCannedNotifications, getMoreCannedNotifications };
