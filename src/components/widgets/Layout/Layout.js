import { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { MagicLoading } from 'components';
import AppBar from '../AppBar';
import SideMenu from '../SideMenu';
import SideBar from '../SideBar';

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
  },
}));

const Layout = ({ children, sidebar }) => {
  const classes = useStyles();
  const { loadingStatus } = useSelector((state) => state.loading);

  return (
    <main className={classes.root}>
      <MagicLoading loading={loadingStatus} />
      <SideMenu />

      <div className={classes.container}>
        <AppBar />
        <div className={classes.content}>{children}</div>
      </div>

      <SideBar>{sidebar}</SideBar>
    </main>
  );
};

export default memo(Layout);
