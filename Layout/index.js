
import { memo } from 'react'
import clsx from 'clsx';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import MagicLoading from 'components/MagicLoading'
import TopAppBar from './TopAppBar'
import SideDrawer from './SideDrawer'
import AppBar from './AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  container: {
    minHeight: '100vh',
    padding: theme.spacing(3, 4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: theme.custom.layout.drawerWidth,
  },
  containerShift: {
    [theme.breakpoints.down('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }
  },
}));

const Layout = ({
  children
}) => {
  const classes = useStyles();
  const { loadingStatus } = useSelector(state => state.loading);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { sideDrawer } = useSelector(state => state.sidebar);

  return (
    isAuthenticated
      ? (
        <main className={classes.root}>
          {
            loadingStatus &&
            <MagicLoading loading={loadingStatus} />
          }
          <SideDrawer />
          <div className={clsx(classes.container, {
            [classes.containerShift]: !sideDrawer,
          })}>
            <Grid container>
              <Grid item xs={12}>
                <AppBar />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TopAppBar />
              </Grid>
              <Grid item xs={12}>
                {children}
              </Grid>
            </Grid>
          </div>
        </main>
      ) : (
        <div />
      )
  );
};

export default memo(Layout);
