import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import * as scheduleAPI from 'services/api-schedule';
import { getScheduledNotifications } from 'actions/getScheduledNotifications';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import MagicScheduleInfo from 'parts/Card/MagicScheduleInfo';
import MagicAlertStatus from 'parts/Card/MagicAlertStatus';
import MagicConfirmDialog from 'parts/MagicConfirmDialog';
import useLoading from 'utils/hooks/useLoading';
import { showSuccessToast, showErrorToast } from 'utils/helpers/toast';
import { ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';
import getPercent from 'utils/helpers/getPercent';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${theme.custom.palette.lightGrey}`,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  imageView: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  rowView: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 300,
  },
  type: {
    fontSize: 14,
    textTransform: 'capitalize',
    margin: theme.spacing(1.5),
  },
  button: {
    fontSize: 14,
    height: 35,
    margin: theme.spacing(1.5),
  },
  image: {
    minWidth: 42,
    width: 42,
    height: 42,
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
    marginRight: 20,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.21)',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
    borderLeft: `1px solid ${theme.custom.palette.lightGrey}`,
    [theme.breakpoints.down('md')]: {
      borderLeft: 'unset',
    },
  },
}));

const MagicScheduleAlert = ({ item, onEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const {
    scheduled: { results },
  } = useSelector((state) => state.notifications);
  const {
    statistics: { total = 0 },
  } = useSelector((state) => state.fanbands);

  const [openModal, setOpenModal] = useState(false);

  const deleteHandler = useCallback(async () => {
    changeLoadingStatus(true);
    try {
      const { message } = await scheduleAPI.deleteScheduledNotification(
        item.id
      );
      showSuccessToast(message);
      dispatch(getScheduledNotifications(results.length - 1));
    } catch (error) {
      if (error.response) {
        const { data: { message = [] } = {} } = error.response;
        showErrorToast(message[0]);
      }
    }
    changeLoadingStatus(false);
  }, [item, results, dispatch, changeLoadingStatus]);

  const editHandler = useCallback(() => {
    onEdit(item);
  }, [item, onEdit]);

  return (
    <div className={classes.item}>
      <div className={classes.leftContainer}>
        <div className={classes.imageView}>
          <img
            alt="news image"
            src={item.imageUrl || ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH}
            className={classes.image}
          />
          <MagicScheduleInfo item={item} />
        </div>
        <div className={classes.rowView}>
          <Typography color="textPrimary" className={classes.type}>
            {item.type}
          </Typography>
          {!item.isSent && (
            <>
              <ContainedButton
                size="small"
                color="blue"
                className={classes.button}
                onClick={editHandler}
              >
                Edit
              </ContainedButton>
              <ContainedButton
                size="small"
                color="red"
                className={classes.button}
                onClick={() => setOpenModal(true)}
              >
                Cancel
              </ContainedButton>
            </>
          )}
        </div>
      </div>

      <div className={classes.rightContainer}>
        <MagicAlertStatus
          title="Sent:"
          value={item?.sent || 0}
          percent={getPercent(item?.sent, total)}
        />
        <MagicAlertStatus
          title="Open:"
          value={item?.received || 0}
          percent={getPercent(item?.received, item?.sent || 0)}
        />
      </div>
      {openModal && (
        <MagicConfirmDialog
          open={openModal}
          setOpen={setOpenModal}
          onConfirm={deleteHandler}
        />
      )}
    </div>
  );
};

export default memo(MagicScheduleAlert);
