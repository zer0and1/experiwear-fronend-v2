import { makeStyles } from "@material-ui/core";
import moment from 'moment';
import { useMemo } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    marginLeft: 40,
    width: 'calc(100% - 40px)',
    height: 8,
    top: props => props.top,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.info.main,
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: theme.palette.info.main,
  },
}));

const LineSlot = ({ time }) => {
  const hour = useMemo(() => parseInt(moment(time).format('HH')), [time]);
  const minute = useMemo(() => parseInt(moment(time).format('mm')), [time]);
  const top = useMemo(() => Math.round(72 * (hour + minute / 60) - 4), [hour, minute]);
  const classes = useStyles({ top });

  return (
    <div className={classes.root}>
      <div className={classes.circle} />
      <div className={classes.line} />
    </div>
  )
};

export default LineSlot;