import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {

  },
  token: {

  },
  lastToken: {

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
          <Link color="inherit" to={token.path} component={RouterLink} className={classes.token}>
            {token.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>

  )
};

export default PathIndicator;