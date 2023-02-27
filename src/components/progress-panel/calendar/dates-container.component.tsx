import compareAsc from "date-fns/compareAsc";
import { useCallback, useState } from "react";
import { getDatesOfMonth } from "../../../utils/calendar.utils";
import { addCompletedDayToHabit } from "../../../utils/stats.utils";
import { useCalendarStore } from "../../../utils/store/calendar.store";
import { usePanelStore } from "../../../utils/store/panel.store";
import { Habit } from "../../../utils/types.utils";
import { getDateAsString } from "../../card/progress-menu.component";
import { areDatesEqual } from "../../../utils/calendar.utils";
import Day from "./day.component";

const DatesContainer = () => {
  const [reload, setReload] = useState(false);
  const selectedDate = usePanelStore((state) => state.selectedDate);
  const selectedHabit = usePanelStore((state) => state.selectedHabit);
  const setSelectedHabit = usePanelStore((state) => state.setSelectedHabit);

  const editMode = useCalendarStore((state) => state.editMode);

  const monthDates = getDatesOfMonth(selectedDate);

  const getActiveDays = useCallback(() => {
    return selectedHabit?.activeDays.filter((day) => {
      const dayAsDate = new Date(day.date);
      return day.completed && dayAsDate >= monthDates[0].d;
    });
  }, [selectedHabit, monthDates]);

  const handleClick = (d: Date, habit: Habit) => {
    addCompletedDayToHabit(habit, d);
    setSelectedHabit(habit);
    setReload(!reload);
  };

  const activeDays = getActiveDays();

  let activeDaysIndex = 0;

  return (
    <div className="grid grid-cols-7 text-center gap-x-4 gap-y-3 ">
      {monthDates.map((date) => {
        let isActiveDay = false;
        let isPastDay = false;
        if (activeDays && activeDaysIndex < activeDays.length) {
          const activeDayAsDate = new Date(activeDays[activeDaysIndex].date);
          activeDayAsDate.setMonth(activeDayAsDate.getMonth());
          if (areDatesEqual(activeDayAsDate, date.d)) {
            isActiveDay = true;
            activeDaysIndex++;
          }
        }
        return (
          <Day
            key={date.d.getTime()}
            isSurplus={date.active}
            active={isActiveDay}
            date={date.d}
            onClick={
              editMode
                ? compareAsc(new Date(getDateAsString()), date.d) !== -1
                  ? () => {
                      if (selectedHabit) {
                        handleClick(date.d, selectedHabit);
                      }
                    }
                  : undefined
                : undefined
            }
          />
        );
      })}
    </div>
  );
};
export default DatesContainer;
