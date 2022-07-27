import { useCallback, useContext, useMemo } from "react";
import { PanelContext } from "../../../context/progress-panel.context";
import { getDatesOfMonth, weekDays } from "../../../utils/calendar.utils";
import CalendarNavigation from "./calendar-nav.component";

const Calendar = () => {
  const { startingDate, selectedHabit } = useContext(PanelContext);
  const monthDates = getDatesOfMonth(startingDate);

  const getActiveDays = useCallback(() => {
    return selectedHabit?.activeDays.filter((day) => day.completed);
  }, [selectedHabit]);

  const activeDays = useMemo(
    () => getActiveDays(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedHabit]
  );

  let activeDaysIndex = 0;

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
          let isActiveDay = false;
          if (activeDays) {
            if (activeDaysIndex < activeDays.length) {
              const activeDayAsDate = new Date(
                activeDays[activeDaysIndex].date
              );
              activeDayAsDate.setMonth(activeDayAsDate.getMonth() + 1);
              if (
                activeDayAsDate.getDate() === date.d.getDate() &&
                activeDayAsDate.getMonth() === date.d.getMonth() &&
                activeDayAsDate.getFullYear() === date.d.getFullYear()
              ) {
                isActiveDay = true;
                activeDaysIndex++;
              }
            }
          }
          return (
            <div
              className={`${
                date.active
                  ? isActiveDay
                    ? "text-blue-400"
                    : "text-white"
                  : "text-neutral-600"
              }`}
              key={date.d.getTime()}
            >{`${date.d.getDate()}`}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
