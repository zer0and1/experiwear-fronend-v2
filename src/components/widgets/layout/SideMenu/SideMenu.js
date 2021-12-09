import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Drawer, useMediaQuery } from '@material-ui/core';

import { SubMenu } from './components';
import { SIDEBAR_GROUPS } from './constants';
import { Logo, LogoutIcon } from 'components';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'redux/actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      visible: 'visible',
    },
    width: theme.custom.layout.sideMenu,
    flexShrink: 0,
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    width: theme.custom.layout.sideMenu,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.17)',
    paddingTop: theme.spacing(7),
    border: 'none !important',
  },
  logo: {
    marginBottom: theme.spacing(2),
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    justifyContent: 'flex-start',
    '& .MuiButton-startIcon': {
      marginRight: 20,
    },
  },
}));

const SideMenu = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Drawer
      open={!matches}
      anchor="left"
      variant="persistent"
      className={classes.root}
      classes={{
        paper: classes.paper,
      }}
    >
      <Logo className={classes.logo} />
      {SIDEBAR_GROUPS.map(({ title, items }) => (
        <SubMenu key={title} title={title} items={items} />
      ))}
      <Button
        startIcon={<LogoutIcon />}
        className={classes.logoutButton}
        onClick={handleLogout}
        variant="text"
        color="default"
      >
        Log out
      </Button>
    </Drawer>
  );
};

export default memo(SideMenu);
