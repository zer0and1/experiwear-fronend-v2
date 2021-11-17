import { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  LineSlot,
  TimelineGrid,
  TimelineSlot,
  TimelineSlotDetailed,
} from './components';
import moment from 'moment';
import { conv2time } from './helpers';
import { TIMELINE_OPTIONS_DETAIL, TIMELINE_OPTIONS_NORMAL } from './constants';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    minHeight: 500,
    overflowY: 'auto',
    position: 'relative',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 4,
    },
  },
  slotContainer: {
    position: 'absolute',
    left: (props) => (props.detailView ? 45 : 0),
    width: (props) => (props.detailView ? 'calc(100% - 146px - 45px)' : '100%'),
    height: '100%',
  },
}));

const Timeline = ({ date = null, slots = [], detailView = false }) => {
  const classes = useStyles({ detailView });
  const checkToday = useMemo(
    () => moment().isSame(moment(date), 'day'),
    [date]
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const options = useMemo(
    () => (detailView ? TIMELINE_OPTIONS_DETAIL : TIMELINE_OPTIONS_NORMAL),
    [detailView]
  );
  const SlotComponent = useMemo(
    () => (detailView ? TimelineSlotDetailed : TimelineSlot),
    [detailView]
  );

  const beginTime = useMemo(() => {
    if (slots.length === 0) {
      const ctime = conv2time(currentTime);
      if (ctime.hours() < 3) {
        return ctime.minutes(0);
      } else {
        return ctime.subtract(3, 'hours').minutes(0);
      }
    } else {
      const minTime = moment.min(slots.map((s) => conv2time(s.createdAt)));
      const mins = minTime.minutes() - (minTime.minutes() % options.unit);
      return minTime.minutes(mins);
    }
  }, [slots, currentTime, options]);

  const endTime = useMemo(() => {
    if (slots.length === 0) {
      const ctime = conv2time(currentTime);
      const boundMax = 60 - (60 % options.unit);
      if (ctime.hours() > 20) {
        return ctime.minutes(boundMax);
      } else {
        return ctime.add(3, 'hours').minutes(boundMax);
      }
    } else {
      const maxTime = moment.max(slots.map((s) => conv2time(s.createdAt)));
      const mins = maxTime.minutes() - (maxTime.minutes() % options.unit);
      return maxTime.minutes(mins);
    }
  }, [slots, currentTime, options]);

  useEffect(() => {
    const loopId = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(loopId);
  }, []);

  return (
    <div className={classes.root}>
      <TimelineGrid
        offset={options.offset}
        step={options.step}
        unit={options.unit}
        beginTime={beginTime}
        endTime={endTime}
        detailView={detailView}
      />
      <div className={classes.slotContainer}>
        {slots.map(({ id, type, title, createdAt, imageUrl }) => (
          <SlotComponent
            key={id}
            type={type}
            title={title}
            datetime={createdAt}
            imageUrl={imageUrl}
            offsetTime={beginTime}
            offset={options.offset}
            unit={options.unit}
            step={options.step}
          />
        ))}
      </div>
      {!detailView && checkToday && (
        <LineSlot
          time={currentTime}
          offsetTime={beginTime}
          offset={options.offset}
          unit={options.unit}
          step={options.step}
        />
      )}
    </div>
  );
};

export default Timeline;
