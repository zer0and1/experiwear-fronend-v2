import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Breadcrumbs, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {

  },
  token: {
    color: '#79869f',
    fontSize: 12,
    letterSpacing: 0.36,
  },
  lastToken: {
    fontFamily: 'SFProDisplay-BlackItalic',
    fontSize: theme.spacing(3),
    color: '#0f3f62',
    letterSpacing: 0.72,
    textTransform: 'uppercase',
  },
}));

const PathIndicator = () => {
  const classes = useStyles();
  const pathTokens = useSelector(state => state.aux.pathTokens);
  const lastTokenLabel = useMemo(() => pathTokens.length && pathTokens[pathTokens.length - 1].label, [pathTokens]);

  return (
    <Box className={classes.root}>
      <Typography className={classes.lastToken}>
        {lastTokenLabel}
      </Typography>

      <Breadcrumbs>
        {pathTokens.map(token => (
          <Link key={token.path} color="inherit" to={token.path} className={classes.token}>
            {token.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>

  )
};

export default PathIndicator;