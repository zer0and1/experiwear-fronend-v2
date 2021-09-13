import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from "@material-ui/icons";
import Drawer from '@material-ui/core/Drawer'

import { SubMenu } from './components'
import Logo from 'components/Logo'
import SIDEBAR_GROUPS from 'utils/constants/sidebar-menu'
import { useMediaQuery } from '@material-ui/core';

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
    paddingTop: theme.spacing(7),
    border: 'none !important',
  },
  logo: {
    marginBottom: theme.spacing(2),
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

const SideMenu = () => {
  const classes = useStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Drawer
      open={!matches}
      anchor='left'
      variant='persistent'
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerBtn}>
        <Close />
      </div>
      <Logo className={classes.logo} />

      {SIDEBAR_GROUPS.map(({ title, items }) => <SubMenu key={title} title={title} items={items} />)}
    </Drawer>
  );
};

export default memo(SideMenu);
