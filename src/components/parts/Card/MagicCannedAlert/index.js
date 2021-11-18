import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import * as cannedAPI from 'services/api-canned';
import { getCannedNotifications } from 'redux/actions/getCannedNotifications';
import { ContainedButton } from 'components';
import MagicAlertInfo from 'components/parts/Card/MagicAlertInfo';
import MagicConfirmDialog from 'components/parts/MagicConfirmDialog';
import useLoading from 'hooks/useLoading';
import { showSuccessToast, showErrorToast } from 'utils/helpers/toast';
import { ALERT_IMAGE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';

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

const MagicCannedAlert = ({ item, onEdit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const {
    canned: { results },
  } = useSelector((state) => state.notifications);
  const [openModal, setOpenModal] = useState(false);

  const sendHandler = useCallback(async () => {
    changeLoadingStatus(true);
    try {
      const { message } = await cannedAPI.sendCanned(item.id);
      showSuccessToast(message);
    } catch (error) {
      if (error.response) {
        const { data: { message = [] } = {} } = error.response;
        showErrorToast(message[0]);
      }
    }
    changeLoadingStatus(false);
  }, [item, changeLoadingStatus]);

  const deleteHandler = useCallback(async () => {
    changeLoadingStatus(true);
    try {
      const { message } = await cannedAPI.deleteCanned(item.id);
      showSuccessToast(message);
      dispatch(getCannedNotifications(results.length - 1));
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
          <MagicAlertInfo item={item} />
        </div>
        <div className={classes.rowView}>
          <ContainedButton
            size="small"
            color="purple"
            className={classes.button}
            onClick={sendHandler}
          >
            Send
          </ContainedButton>
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
            Delete
          </ContainedButton>
        </div>
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

export default memo(MagicCannedAlert);
