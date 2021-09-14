import { useMemo } from "react";
import { layoutDaysOfMonth } from "components/Calendar/helpers";
import moment from "moment";
import CalendarCell from "../CalendarCell";


const CalendarBody = ({ year, month, date }) => {
  const layoutDays = useMemo(() => layoutDaysOfMonth(year, month), [year, month]);

  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, row) => (
        <tr key={row}>
          {layoutDays[row].map((day, idx) => (
            <CalendarCell day={day} key={idx} selected={moment(`${year}-${month}-${day}`).isSame(moment(date), 'day')} />
          ))}
        </tr>
      ))}
    </tbody>
  )
};

export default CalendarBody;
