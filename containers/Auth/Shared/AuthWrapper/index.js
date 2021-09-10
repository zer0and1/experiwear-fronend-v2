
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import BandLogo from 'components/BandLogo'
import MagicLoading from 'components/MagicLoading'
import { AUTH_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7fafc',
    minHeight: '100vh',
    padding: theme.spacing(0, 4),
  },
  container: {
    width: '100%',
    maxWidth: 1170,
    minHeight: 649,
    backgroundImage: `url(${AUTH_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50% 100%',
    backgroundPosition: 'left',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      background: 'none',
    }
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(6, 6),
  },
  imgSection: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  bandLogo: {
  },
  logo: {
    marginTop: theme.spacing(4)
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: theme.spacing(4, 0)
  }
}));

const authPageStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginBottom: theme.spacing(4)
  },
  button: {
    marginBottom: theme.spacing(2.5),
    borderRadius: theme.spacing(3),
    height: 50,
  },
  forgotLink: {
    color: '#d8d8d8',
    fontSize: 14,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  emailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.custom.palette.red,
  }
}));

const AuthWrapper = ({
  title,
  children
}) => {
  const classes = useStyles()
  const { loadingStatus } = useSelector(state => state.loading)

  return (
    <div className={classes.root}>
      {
        loadingStatus &&
        <MagicLoading loading={loadingStatus} />
      }
      <Paper className={classes.container}>
        <Grid container>
          <Grid item md={6} className={classes.imgSection} />
          <Grid item xs={12} md={6} className={classes.formSection}>
            <BandLogo className={classes.bandLogo} />
            <Typography
              color='textPrimary'
              className={classes.title}
            >
              {title}
            </Typography>
            {children}
          </Grid>
        </Grid>

      </Paper>
    </div>
  )
}

export { authPageStyles };
export default memo(AuthWrapper);