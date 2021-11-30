import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Breadcrumbs,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {},
  token: {
    color: '#79869f',
    fontSize: 12,
    letterSpacing: 0.36,
    cursor: 'pointer',
  },
  lastToken: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: theme.spacing(3),
    color: '#0f3f62',
    letterSpacing: 0.72,
  },
  separator: {
    color: '#79869f',
    fontSize: 12,
    margin: theme.spacing(0, 0.5),
  },
}));

const PathIndicator = () => {
  const classes = useStyles();
  const router = useRouter();
  const pathTokens = useSelector((state) => state.aux.pathTokens);
  const lastTokenLabel = useMemo(
    () => (pathTokens.length ? pathTokens[pathTokens.length - 1].title : ''),
    [pathTokens]
  );

  const handleTokenClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.lastToken}>{lastTokenLabel}</Typography>

      <Breadcrumbs classes={{ separator: classes.separator }} separator="/">
        {pathTokens.map((token) => (
          <Link
            key={token.path}
            color="inherit"
            onClick={() => handleTokenClick(token.path)}
            className={classes.token}
          >
            {token.token || token.title}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default PathIndicator;
