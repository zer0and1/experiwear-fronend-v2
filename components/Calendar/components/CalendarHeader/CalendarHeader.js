import { makeStyles } from "@material-ui/core";
import { DEFAULT_WEEKDAYS } from "components/Calendar/constants";

const useStyles = makeStyles(theme => ({
  root: {
  },
  dayCell: {
    fontFamily: theme.custom.fonts.SFProTextRegular,
    fontSize: 14,
    color: '#989db3',
  },
}));

const CalendarHeader = ({ weekdays = DEFAULT_WEEKDAYS }) => {
  const classes = useStyles();

  return (
    <thead className={classes.root}>
      <tr>
        {weekdays.map(day => <td key={day} className={classes.dayCell}>{day}</td>)}
      </tr>
    </thead>
  )
};

export default CalendarHeader;