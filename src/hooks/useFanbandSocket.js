import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setNotifications,
  setLatestNotification,
  setFanbandsStatistics,
} from 'redux/actions';
import { ANSWER_ENUM } from 'utils/constants/alert-types';
import { useSocket } from 'hooks';
import WS_EVENTS from 'utils/constants/socket';

const useFanbandSocket = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  const inAreaHandler = useCallback(
    (statistics) => {
      dispatch(setFanbandsStatistics(statistics));
    },
    [dispatch]
  );
  useSocket(WS_EVENTS.FANBAND_IN_AREA, inAreaHandler);

  const statusHandler = useCallback(
    (statistics) => {
      dispatch(setFanbandsStatistics(statistics));
    },
    [dispatch]
  );
  useSocket(WS_EVENTS.FANBAND_STATUS, statusHandler);

  const reactHandler = useCallback(
    ({ id, type }) => {
      try {
        const { results = [] } = notifications[type];
        const { latest = {} } = notifications;

        const newNotifications = results.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              opened: (item?.opened || 0) + 1,
            };
          }
          return item;
        });
        dispatch(setNotifications(type, newNotifications));

        if (latest.id === id) {
          const newLatest = {
            ...latest,
            opened: (latest?.opened || 0) + 1,
          };
          dispatch(setLatestNotification('', newLatest));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [notifications, dispatch]
  );
  useSocket(WS_EVENTS.FANBAND_REACT, reactHandler);

  const answerHandler = useCallback(
    ({ id, type, answer }) => {
      try {
        const { results = [] } = notifications[type];
        const { latestSurvey = {} } = notifications;

        const newNotifications = results.map((item) => {
          if (item.id === id) {
            switch (answer) {
              case ANSWER_ENUM.NO:
                return { ...item, no: (item?.no || 0) + 1 };
              case ANSWER_ENUM.YES:
                return { ...item, yes: (item?.yes || 0) + 1 };
            }
          }
          return item;
        });
        dispatch(setNotifications(type, newNotifications));

        if (latestSurvey.id === id) {
          let newLatestSurvey = {};
          switch (answer) {
            case ANSWER_ENUM.NO:
              return { ...latestSurvey, no: (latestSurvey?.no || 0) + 1 };
            case ANSWER_ENUM.YES:
              return { ...latestSurvey, yes: (latestSurvey?.yes || 0) + 1 };
          }
          dispatch(setLatestNotification(type, newLatestSurvey));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [notifications, dispatch]
  );
  useSocket(WS_EVENTS.FANBAND_ANSWER, answerHandler);
};

export default useFanbandSocket;
