import { useCallback, useContext } from "react";
import { PanelContext } from "../../../context/progress-panel.context";
import { getDatesOfMonth } from "../../../utils/calendar.utils";
import Day from "./day.component";

const DatesContainer = () => {
  const { selectedDate, selectedHabit } = useContext(PanelContext);
  const monthDates = getDatesOfMonth(selectedDate);
  const getActiveDays = useCallback(() => {
    return selectedHabit?.activeDays.filter((day) => {
      const monthFromDay = parseInt(day.date.slice(5, 7));
      return monthFromDay === selectedDate.getMonth() + 1 && day.completed;
    });
  }, [selectedHabit, selectedDate]);
  const activeDays = getActiveDays();
  let activeDaysIndex = 0;
  return (
    <div className="grid grid-cols-7 text-center gap-x-4 gap-y-3 ">
      {monthDates.map((date) => {
        let isActiveDay = false;
        if (activeDays) {
          if (activeDaysIndex < activeDays.length) {
            const activeDayAsDate = new Date(activeDays[activeDaysIndex].date);
            activeDayAsDate.setMonth(activeDayAsDate.getMonth());
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
          <Day
            key={date.d.getTime()}
            isSurplus={date.active}
            active={isActiveDay}
            date={date.d}
          />
        );
      })}
    </div>
  );
};
export default DatesContainer;
