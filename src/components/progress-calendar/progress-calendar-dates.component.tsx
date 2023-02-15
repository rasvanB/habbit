import { useState } from "react";
import { getDatesOfMonth } from "../../utils/calendar.utils";
import Day from "../progress-panel/calendar/day.component";
import { addCompletedDayToHabit } from "../../utils/stats.utils";
import { compareAsc } from "date-fns";
import { getDateAsString } from "../card/progress-menu.component";
import { Habit } from "../../utils/types.utils";
import { useCalendarStore } from "../../utils/store/calendar.store";

type ProgressCalendarDatesProps = {
  habit: Habit;
};

const areDatesEqual = (d1: Date, d2: Date) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const ProgressCalendarDates = ({ habit }: ProgressCalendarDatesProps) => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const [reload, setReload] = useState(false);
  const monthDates = getDatesOfMonth(selectedDate);

  const getActiveDays = () => {
    return habit?.activeDays.filter((day) => {
      const dayAsDate = new Date(day.date);
      return day.completed && dayAsDate >= monthDates[0].d;
    });
  };

  const handleClick = (d: Date) => {
    addCompletedDayToHabit(habit, d);
    setReload(!reload);
  };
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
            if (areDatesEqual(activeDayAsDate, date.d)) {
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
            inactiveCompletedStyle="dark:text-blue-800 dark:outline-blue-800 outline outline-2 text-blue-300 outline-blue-300"
            onClick={
              compareAsc(new Date(getDateAsString()), date.d) !== -1
                ? () => handleClick(date.d)
                : undefined
            }
          />
        );
      })}
    </div>
  );
};
export default ProgressCalendarDates;
