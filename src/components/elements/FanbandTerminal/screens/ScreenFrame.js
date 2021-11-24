import { Box, makeStyles } from '@material-ui/core';
import { Fragment } from 'react';
import {
  TERMINAL_ATL,
  TERMINAL_BATTERY,
  TERMINAL_HAWKS,
  TERMINAL_HAWKS_LOGO,
  TERMINAL_LINK,
} from 'utils/constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '12px 8px',
    clipPath: `url(#clip-path)`,
    overflow: 'hidden',
  },
  hawksIcon: {
    height: 50,
    marginBottom: 8,
  },
});

const ScreenFrame = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children ? (
        <Fragment>
          <img src={TERMINAL_LINK} height={12} />
          {children}
          <img src={TERMINAL_BATTERY} height={12} />
        </Fragment>
      ) : (
        <Fragment>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
            mt={3}
            height={70}
          >
            <img src={TERMINAL_ATL} height={40} />
            <img src={TERMINAL_HAWKS} height={24} />
          </Box>
          <img src={TERMINAL_HAWKS_LOGO} className={classes.hawksIcon} />
        </Fragment>
      )}
    </div>
  );
};

export default ScreenFrame;
