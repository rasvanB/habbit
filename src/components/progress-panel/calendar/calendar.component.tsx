import { useContext } from "react";
import { PanelContext } from "../../../context/progress-panel.context";
import { getDatesOfMonth } from "../../../utils/calendar.utils";
import CalendarNavigation from "./calendar-nav.component";

const Calendar = () => {
  const { startingDate } = useContext(PanelContext);
  const monthDates = getDatesOfMonth(startingDate);
  return (
    <div>
      <CalendarNavigation />
      <div className="grid grid-cols-7 text-white text-center">
        {monthDates.map((date) => {
          return <div key={date.d.getDate()}>{`${date.d.getDate()}`}</div>;
        })}
      </div>
    </div>
  );
};

export default Calendar;
