import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LoadingSpinner from './LoadingSpinner';
import { Backdrop } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: (props) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: props.height ? props.height : '100%',
    zIndex: 9999,
  }),
}));

const ExpLoading = ({ loading, height, size }) => {
  const classes = useStyles({ height });

  return (
    <Backdrop className={classes.root} open={loading}>
      <LoadingSpinner size={size} />
    </Backdrop>
  );
};

export default memo(ExpLoading);
