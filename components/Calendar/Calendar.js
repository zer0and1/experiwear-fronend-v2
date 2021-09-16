import { useState } from "react";
import { CalendarHeader } from "./components";
import moment from "moment";
import CalendarBody from "./components/CalendarBody";
import { Box, makeStyles } from "@material-ui/core";
import CalendarPicker from "./components/CalendarPicker";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  table: {
    width: '100%',
  }
}));

const defaultCellData = {
  '2021-09-01': { news: true, survey: true, score: true, promo: true },
  '2021-09-03': { news: true, survey: false, score: true, promo: false },
  '2021-09-13': { news: false, survey: true, score: false, promo: true },
  '2021-09-15': { news: true, survey: false, score: false, promo: true },
  '2021-09-23': { news: true, survey: true, score: true, promo: false },
};

const Calendar = ({ value = new Date(), cellData = defaultCellData, onChange = () => {} }) => {
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