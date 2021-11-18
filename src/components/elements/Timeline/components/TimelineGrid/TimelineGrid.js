import { makeStyles } from '@material-ui/core';
import { useMemo } from 'react';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    marginTop: (props) => props.offset,
    width: '100%',
    height: (props) => `calc(100%  - ${props.offset}px)`,
  },
  slot: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: (props) => props.height,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  slotLabel: {
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 12,
    color: '#787d93',
    width: 32,
    marginRight: 23,
    marginTop: -7,
    position: (props) => (props.detailView ? 'absolute' : 'relative'),
    top: (props) => (props.detailView ? -12 : 0),
  },
  slotLine: {
    width: (props) => (props.detailView ? '100%' : 'calc(100% - 55px)'),
    height: 1,
    backgroundColor: '#e8e9ed',
  },
}));

const TimelineGrid = ({
  offset,
  step,
  unit,
  beginTime,
  endTime,
  detailView,
}) => {
  const classes = useStyles({ offset, detailView });
  const period = useMemo(
    () => moment(endTime).diff(moment(beginTime), 'minutes', true),
    [beginTime, endTime]
  );
  const labels = useMemo(
    () =>
      Array.from({ length: period / unit + 1 }).map((_, idx) =>
        moment(beginTime)
          .add(idx * unit, 'minutes')
          .format('HH:mm')
      ),
    [beginTime, period, unit]
  );

  return (
    <div className={classes.root}>
      {labels.map((label, idx) => (
        <div key={idx} className={classes.slot} style={{ top: idx * step }}>
          <div className={classes.slotLabel}>{label}</div>
          <div className={classes.slotLine} />
        </div>
      ))}
    </div>
  );
};

export default TimelineGrid;
