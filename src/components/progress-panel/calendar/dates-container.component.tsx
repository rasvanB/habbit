import { useCallback, useContext } from "react";
import { PanelContext } from "../../../context/progress-panel.context";
import { getDatesOfMonth } from "../../../utils/calendar.utils";
import Day from "./day.component";

const DatesContainer = () => {
  const { startingDate, selectedHabit } = useContext(PanelContext);
  const monthDates = getDatesOfMonth(startingDate);

  const getActiveDays = useCallback(() => {
    return selectedHabit?.activeDays.filter((day) => day.completed);
  }, [selectedHabit]);

  const activeDays = getActiveDays();

  let activeDaysIndex = 0;
  return (
    <div className="grid grid-cols-7 text-center gap-x-4 gap-y-1">
      {monthDates.map((date) => {
        let isActiveDay = false;
        if (activeDays) {
          if (activeDaysIndex < activeDays.length) {
            const activeDayAsDate = new Date(activeDays[activeDaysIndex].date);
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
          <Day isSurplus={date.active} active={isActiveDay} date={date.d} />
        );
      })}
    </div>
  );
};
export default DatesContainer;
