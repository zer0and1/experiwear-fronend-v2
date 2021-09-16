import { makeStyles } from "@material-ui/core";
import moment from 'moment';
import { useMemo } from "react";
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    marginLeft: 55,
    width: 'calc(100% - 55px)',
    height: props => props.height,
    top: props => props.top,
    backgroundColor: props => fade(theme.palette?.[props.type].main, 0.2),
    borderRadius: 10,
    padding: theme.spacing(0, 2),
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const TimelineSlot = ({ type, time, title, period = 45 }) => {
  const hour = useMemo(() => parseInt(moment(time).format('hh')), [time]);
  const minute = useMemo(() => parseInt(moment(time).format('mm')), [time]);
  const top = useMemo(() => Math.round(72 * (hour + minute / 60)), [hour, minute]);
  const height = useMemo(() => Math.round(72 * period / 60), [period]);
  const classes = useStyles({ type, top, height });

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <span>{title}</span>
        <span>({moment(time).format('hh:mm')})</span>
      </div>
    </div>
  )
};

export default TimelineSlot;