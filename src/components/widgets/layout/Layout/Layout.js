import { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { ExpLoading } from 'components';
import AppBar from '../AppBar';
import SideMenu from '../SideMenu';
import SideBar from '../SideBar';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '56px 40px 38px 40px',
    marginLeft: theme.custom.layout.sideMenu,
    marginRight: theme.custom.layout.sideBar,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('md')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      marginRight: 0,
    },
  },
  content: {
    flexGrow: 1,
    height: 0,
    display: 'flex',
  },
}));

const Layout = ({ children, sidebar, ...boxProps }) => {
  const classes = useStyles();
  const { loadingStatus } = useSelector((state) => state.aux);

  return (
    <main className={classes.root}>
      <ExpLoading loading={loadingStatus} />
      <SideMenu />

      <div className={classes.container}>
        <AppBar />
        <Box className={classes.content} {...boxProps}>
          {children}
        </Box>
      </div>

      <SideBar>{sidebar}</SideBar>
    </main>
  );
};

export default memo(Layout);
