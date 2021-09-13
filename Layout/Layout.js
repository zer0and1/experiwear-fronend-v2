
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import MagicLoading from 'components/MagicLoading'
import AppBar from './AppBar';
import SideMenu from './SideMenu';
import SideBar from './SideBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  container: {
    minHeight: '100vh',
    padding: theme.spacing(7, 5, 5, 5),
    marginLeft: theme.custom.layout.sideMenu,
    marginRight: theme.custom.layout.sideBar,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const { loadingStatus } = useSelector(state => state.loading);

  return (
    <main className={classes.root}>
      <MagicLoading loading={loadingStatus} />
      <SideMenu />
      <div className={classes.container}>
        <AppBar />
        {children}
      </div>
      <SideBar />
    </main>
  );
};

export default memo(Layout);
