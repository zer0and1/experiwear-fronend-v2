import { memo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MagicDialog from 'components/MagicDialog';
import GameDaysContent from './GameDaysContent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: 600,
    marginBottom: theme.spacing(7),
  },
}));

const MagicGameDayDialog = ({ open, setOpen }) => {
  const classes = useStyles();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <MagicDialog open={open} title="Select Gameday" onClose={handleClose}>
      <div className={classes.root}>
        <GameDaysContent setOpen={setOpen} />
      </div>
    </MagicDialog>
  );
};

export default memo(MagicGameDayDialog);
