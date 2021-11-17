import * as TYPES from './types';
import * as accelerometerAPI from 'services/api-accelerometer';

const getAccelerometerData = (notificationId) => async (dispatch) => {
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

// const getMoreAccelerometerData = () => async (dispatch, getState) => {
//   try {
//     const { notifications: { scheduled: { results: preResults } } } = getState();
//     const params = {
//       skip: preResults.length,
//       take: PAGE_COUNT
//     }
//
//     const { results, total } = await scheduleAPI.getScheduledNotifications(params)
//     await dispatch({
//       type: TYPES.SET_SCHEDULED_NOTIFICATIONS,
//       payload: {
//         results: [
//           ...preResults,
//           ...results
//         ],
//         total
//       }
//     });
//   } catch (error) {
//     console.log('[getMoreScheduledNotifications] error => ', error);
//   }
// };

export {
  getAccelerometerData,
  // getMoreScheduledNotifications
};
