import { makeStyles } from "@material-ui/core";
import { DEFAULT_WEEKDAYS } from "components/Calendar/constants";

const useStyles = makeStyles(theme => ({
  cell: {
    fontFamily: theme.custom.fonts.SFProTextRegular,
    fontSize: 14,
    color: '#989db3',
    textAlign: 'center',
  },
}));

const CalendarHeader = ({ weekdays = DEFAULT_WEEKDAYS }) => {
  const classes = useStyles();

  return (
    <thead>
      <tr>
        {weekdays.map(day => <td key={day} className={classes.cell}>{day}</td>)}
      </tr>
    </thead>
  )
};

export default CalendarHeader;