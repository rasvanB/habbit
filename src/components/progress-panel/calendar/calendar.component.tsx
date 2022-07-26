import { useContext } from "react";
import { PanelContext } from "../../../context/progress-panel.context";
import { getDatesOfMonth, weekDays } from "../../../utils/calendar.utils";
import CalendarNavigation from "./calendar-nav.component";

const Calendar = () => {
  const { startingDate } = useContext(PanelContext);
  const monthDates = getDatesOfMonth(startingDate);
  return (
    <div>
      <CalendarNavigation />
      <div className="grid grid-cols-7 text-white text-center">
        {weekDays.map((day) => {
          return <div key={day}>{day.slice(0, 2)}</div>;
        })}
      </div>
      <div className="grid grid-cols-7 text-center">
        {monthDates.map((date) => {
          return (
            <div
              className={`${date.active ? "text-white" : "text-neutral-600"}`}
              key={date.d.getTime()}
            >{`${date.d.getDate()}`}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
