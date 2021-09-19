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

const Calendar = ({
  value = new Date(),
  cellData = {},
  actions = null,
  onChange = () => { },
  minimized = false,
  ...boxProps
}) => {
  const classes = useStyles();
  const [year, setYear] = useState(parseInt(moment(value).format('YYYY')));
  const [month, setMonth] = useState(parseInt(moment(value).format('MM')));

  const handlePickerChange = (year, month) => {
    setYear(year);
    setMonth(month);
  };

  return (
    <Box className={classes.root} {...boxProps}>
      <CalendarPicker
        year={year}
        month={month}
        actions={actions}
        minimized={minimized}
        onChange={handlePickerChange}
      />
      <table className={classes.table}>
        <CalendarHeader minimized={minimized} />
        <CalendarBody
          year={year}
          month={month}
          date={value}
          cellData={cellData}
          minimized={minimized}
          onChange={onChange}
        />
      </table>
    </Box>
  );
};

export default Calendar;