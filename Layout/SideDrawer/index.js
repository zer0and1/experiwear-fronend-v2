
import { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import Logo from 'components/Logo'
import SidebarGroup from './SidebarGroup'
import SIDEBAR_GROUPS from 'utils/constants/sidebar-menu'
import { Close } from "@material-ui/icons";
import { setSideDrawer } from "actions/sidebar";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  drawer: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      visible: 'visible',
    },
    width: theme.custom.layout.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    width: theme.custom.layout.drawerWidth,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.17)',
    padding: theme.spacing(7, 0, 0, 3),
    borderRadius: '0 !important',
  },
  logo: {
    paddingBottom: theme.spacing(5.5)
  },
  drawerBtn: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      display: 'block',
    },
  }
}));

const SideDrawer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  let { sideDrawer } = useSelector(state => state.sidebar);
  const sideDrawerHandler = useCallback(() => {
    dispatch(setSideDrawer(false));
  }, [dispatch]);

  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Drawer
      open={matches ? sideDrawer : true}
      anchor='left'
      variant='persistent'
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerBtn} onClick={sideDrawerHandler}>
        <Close />
      </div>
      <Logo className={classes.logo} />

      {SIDEBAR_GROUPS.map(({ title, items }) => <SidebarGroup key={title} title={title} items={items} />)}
    </Drawer>
  );
};

export default memo(SideDrawer);
