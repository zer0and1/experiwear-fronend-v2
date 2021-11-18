import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { ContainedButton } from 'components';

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 10,
    minWidth: 780,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'unset',
    },
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 5),
    lineHeight: 'initial',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    right: 40,
    color: theme.custom.palette.black,
  },
  dialogContent: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minHeight: 130,
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      minWidth: 520,
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
    },
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2, 3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1.5, 1),
      flexDirection: 'column',
    },
  },
  button: {
    width: '50%',
    fontSize: 14,
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 0),
      width: '100%',
    },
  },
}));

const MagicDialog = ({
  open,
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  onClose,
  confirmDisable = false,
  children,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.paper,
      }}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle
        id="customized-dialog-title"
        disableTypography
        align="center"
        className={classes.dialogTitle}
      >
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <IconButton
          edge="end"
          aria-label="close"
          onClick={onClose}
          className={classes.closeIcon}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
      {(!!cancelLabel || !!confirmLabel) && (
        <DialogActions disableSpacing className={classes.dialogActions}>
          {!!cancelLabel && (
            <ContainedButton
              autoFocus
              color="red"
              onClick={onCancel}
              className={classes.button}
            >
              {cancelLabel}
            </ContainedButton>
          )}
          {!!confirmLabel && (
            <ContainedButton
              disabled={confirmDisable}
              onClick={onConfirm}
              className={classes.button}
            >
              {confirmLabel}
            </ContainedButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default memo(MagicDialog);
