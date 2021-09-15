import { makeStyles } from "@material-ui/core";
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  cell: {
    fontFamily: theme.custom.fonts.SFProTextRegular,
    fontSize: 14,
    color: '#989db3',
    textAlign: 'center',
  },
}));

const CalendarHeader = ({ weekdays = moment.weekdays(true) }) => {
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