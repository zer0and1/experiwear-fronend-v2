import { useState } from "react";
import { CalendarHeader } from "./components";
import moment from "moment";
import CalendarBody from "./components/CalendarBody";
import { Box, makeStyles } from "@material-ui/core";
import CalendarPicker from "./components/CalendarPicker";

const useStyles = makeStyles(theme => ({
  root: {

  },
  table: {

  }
}));

const Calendar = ({ value = new Date(), onChange }) => {
  const classes = useStyles();
  const [year, setYear] = useState(parseInt(moment(value).format('YYYY')));
  const [month, setMonth] = useState(parseInt(moment(value).format('MM')));

  const handlePickerChange = (year, month) => {
    setYear(year);
    setMonth(month);
  };
  
  return (
    <Box className={classes.root}>
      <CalendarPicker year={year} month={month} onChange={handlePickerChange} />
      <table width={700} className={classes.table}>
        <CalendarHeader />
        <CalendarBody year={year} month={month} date={value} />
      </table>
    </Box>
  );
};

export default Calendar;