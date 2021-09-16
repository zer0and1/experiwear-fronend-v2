import { useMemo } from "react";
import { layoutDaysOfMonth } from "components/Calendar/helpers";
import moment from "moment";
import CalendarCell from "../CalendarCell";


const CalendarBody = ({ year, month, date, cellData = {}, onChange }) => {
  const layoutDays = useMemo(() => layoutDaysOfMonth(year, month), [year, month]);

  const handleDaySelect = (day) => {
    onChange(new Date(year, month - 1, day));
  };

  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, row) => (!row || layoutDays[row][0]) && (
        <tr key={row}>
          {layoutDays[row].map((day, idx) => (
            <CalendarCell
              day={day}
              key={idx}
              data={cellData?.[moment(new Date(year, month - 1, day)).format('YYYY-MM-DD')]}
              selected={moment(new Date(year, month - 1, day)).isSame(moment(date), 'day')}
              onSelect={handleDaySelect}
            />
          ))}
        </tr>
      ))}
    </tbody>
  )
};

export default CalendarBody;
