import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { LineSlot, TimelineGrid, TimelineSlot } from "./components";
import moment from 'moment';
import { useMemo } from "react";

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

const Timeline = () => {
  const classes = useStyles();
  const { selectedDate, notifications } = useSelector(({ notifications }) => {
    const { selectedDate, all: { results } } = notifications;
    return {
      selectedDate,
      notifications: results.filter(n => moment(n.createdAt).isSame(moment(selectedDate), 'year')).slice(0, 5)
    };
  });
  const checkToday = useMemo(() => moment().isSame(moment(selectedDate), 'day'), [selectedDate]);

  return (
    <div className={classes.root}>
      <TimelineGrid />
      {notifications.map(({ id, type, title, createdAt }) =>
        <TimelineSlot
          key={id}
          type={type}
          title={title}
          time={createdAt}
        />
      )}
      {checkToday && <LineSlot time={new Date()} />}
    </div>
  )
};

export default Timeline;