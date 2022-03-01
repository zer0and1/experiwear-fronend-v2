import { makeStyles } from '@material-ui/core';
import { TERMINAL_BATTERY, TERMINAL_LINK } from 'utils/constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '10%',
    clipPath: `url(#clip-path)`,
    overflow: 'hidden',
    background: (props) => `url(${props.imageUrl})`,
    backgroundSize: 'cover !important',
  },
});

const FullScreen = ({ imageUrl }) => {
  const classes = useStyles({ imageUrl });

  return (
    <div className={classes.root}>
      <img src={TERMINAL_LINK} height={12} />
      <img src={TERMINAL_BATTERY} height={12} />
    </div>
  );
};

export default FullScreen;
