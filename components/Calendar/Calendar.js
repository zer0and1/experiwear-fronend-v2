import { useState } from "react";
import { CalendarHeader } from "./components";
import moment from "moment";
import CalendarBody from "./components/CalendarBody";
import { Box, makeStyles } from "@material-ui/core";
import CalendarPicker from "./components/CalendarPicker";

const useStyles = makeStyles(() => ({
  root: {
  },
  table: {
    width: '100%',
  }
}));

const Calendar = ({ value = new Date(), cellData = {}, actions, onChange = () => {} }) => {
  const classes = useStyles();
  const [year, setYear] = useState(parseInt(moment(value).format('YYYY')));
  const [month, setMonth] = useState(parseInt(moment(value).format('MM')));

  const handlePickerChange = (year, month) => {
    setYear(year);
    setMonth(month);
  };

  return (
    <Box className={classes.root}>
      <CalendarPicker year={year} month={month} actions={actions} onChange={handlePickerChange} />
      <table className={classes.table}>
        <CalendarHeader />
        <CalendarBody
          year={year}
          month={month}
          date={value}
          cellData={cellData}
          onChange={onChange}
        />
      </table>
    </Box>
  );
};

export default Calendar;