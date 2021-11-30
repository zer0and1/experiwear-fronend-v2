import {
  Box,
  Button,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    textTransform: 'none',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: theme.spacing(1.5),
    objectFit: 'cover',
    width: 46,
    height: 46,
    borderRadius: 6,
  },
  title: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 12,
    color: '#333',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 11,
    padding: 16,
  },
  actions: {
    backgroundColor: '#9ea3ba',
    '&:hover': {
      backgroundColor: '#9ea3ba',
    },
    width: 120,
    height: 35,
  },
  action: {
    width: 120,
    height: 35,
  },
  send: {
    backgroundColor: theme.palette.promo.main,
    '&:hover': {
      backgroundColor: theme.palette.promo.dark,
    },
  },
  edit: {
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  delete: {
    backgroundColor: theme.palette.score.main,
    '&:hover': {
      backgroundColor: theme.palette.score.dark,
    },
  },
}));

const AlertItem = ({
  data: { imageUrl, type, title, createdAt },
  action = false,
  className,
  ...boxProps
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const hanldeOpenActions = (e) => setAnchorEl(e.target);
  const handleCloseActions = () => setAnchorEl(null);

  return (
    <Box {...boxProps} className={clsx(classes.root, className)}>
      <Box display="flex" alignItems="center">
        <img className={classes.icon} src={imageUrl} />
        <div>
          <Typography className={classes.title}>{`${type} alert`}</Typography>
          <Typography className={classes.description}>{title}</Typography>
          <Typography className={classes.description}>
            {moment(createdAt).format('MMM D @ hh:mm A')}
          </Typography>
        </div>
      </Box>
      {action && (
        <Button className={classes.actions} onClick={hanldeOpenActions}>
          Actions
        </Button>
      )}
      <Popover
        onClose={handleCloseActions}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <div className={classes.actionsContainer}>
          <Button className={clsx(classes.action, classes.send)}>Send</Button>
          <Button className={clsx(classes.action, classes.edit)}>Edit</Button>
          <Button className={clsx(classes.action, classes.delete)}>
            Delete
          </Button>
        </div>
      </Popover>
    </Box>
  );
};

export default AlertItem;
