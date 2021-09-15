import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { TimelineGrid, TimelineSlot } from "./components";
import moment from 'moment';

const useStyles = makeStyles(_ => ({
  root: {
    height: '100%',
    overflowY: 'auto',
    position: 'relative',
  },
}));

const Timeline = () => {
  const classes = useStyles();
  const notifications = useSelector(({ notifications }) => {
    const { selectedDate, all: { results } } = notifications;
    return results.filter(n => moment(n.createdAt).isSame(moment(selectedDate), 'year')).slice(0, 5);
  });

  return (
    <div className={classes.root}>
      <TimelineGrid />
      {notifications.map(({ id, type, title, body, createdAt }) =>
        <TimelineSlot
          key={id}
          type={type}
          title={title}
          content={body}
          time={createdAt}
        />
      )}
    </div>
  )
};

export default Timeline;