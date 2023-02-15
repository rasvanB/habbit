import { useCallback } from "react";
import { getDatesOfMonth } from "../../../utils/calendar.utils";
import { usePanelStore } from "../../../utils/store/panel.store";
import Day from "./day.component";

const DatesContainer = () => {
  const selectedDate = usePanelStore((state) => state.selectedDate);
  const selectedHabit = usePanelStore((state) => state.selectedHabit);

  const monthDates = getDatesOfMonth(selectedDate);

  const getActiveDays = useCallback(() => {
    return selectedHabit?.activeDays.filter((day) => {
      const dayAsDate = new Date(day.date);
      return day.completed && dayAsDate >= monthDates[0].d;
    });
  }, [selectedHabit, monthDates]);

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
