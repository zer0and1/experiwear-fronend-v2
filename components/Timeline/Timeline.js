import { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { LineSlot, TimelineGrid, TimelineSlot } from "./components";
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
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
}));

const Timeline = ({ date, slots = [] }) => {
  const classes = useStyles();
  const checkToday = useMemo(() => moment().isSame(moment(date), 'day'), [date]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const loopId = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(loopId);
  }, []);

  return (
    <div className={classes.root}>
      <TimelineGrid />
      {slots.map(({ id, type, title, createdAt }) =>
        <TimelineSlot
          key={id}
          type={type}
          title={title}
          time={createdAt}
        />
      )}
      {checkToday && <LineSlot time={currentTime} />}
    </div>
  )
};

export default Timeline;