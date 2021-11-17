import * as TYPES from './types';
import * as notificationsAPI from 'services/api-notifications';
import { ALERT_TYPES } from 'utils/constants/alert-types';
import { isEmpty } from 'utils/helpers/utility';

const getLatestNewsNotifications =
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

export default getLatestNewsNotifications;
