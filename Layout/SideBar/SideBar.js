import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  paper: {
  }
}));

const SideBar = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Drawer
      open={!matches}
      anchor='right'
      variant='persistent'
      className={classes.root}
      classes={{ paper: classes.paper }}
    >
    </Drawer>
  );
};

export default memo(SideBar);
