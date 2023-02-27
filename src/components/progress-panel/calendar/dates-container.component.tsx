import { useMemo, useState } from "react";
import {
  getDatesOfMonth,
  isDatePastOrToday,
} from "../../../utils/calendar.utils";
import { addCompletedDayToHabit } from "../../../utils/stats.utils";
import { useCalendarStore } from "../../../utils/store/calendar.store";
import { usePanelStore } from "../../../utils/store/panel.store";
import { areDatesEqual } from "../../../utils/calendar.utils";
import Day from "./day.component";
import { useUserStore } from "../../../utils/store/user.store";
import { addHabitToUser } from "../../../utils/firebase/firebase.utils";

const DatesContainer = () => {
  const [reload, setReload] = useState(false);
  const selectedDate = usePanelStore((state) => state.selectedDate);
  const selectedHabit = usePanelStore((state) => state.selectedHabit);
  const currentUser = useUserStore((state) => state.currentUser);
  const editHabit = useUserStore((state) => state.editHabit);
  const editMode = useCalendarStore((state) => state.editMode);

  const setSelectedHabit = usePanelStore((state) => state.setSelectedHabit);

  const monthDates = useMemo(
    () => getDatesOfMonth(selectedDate),
    [selectedDate]
  );

  const activeDays = useMemo(() => {
    return selectedHabit?.activeDays.filter((day) => {
      const dayAsDate = new Date(day.date);
      return day.completed && dayAsDate >= monthDates[0].d;
    });
  }, [selectedHabit, monthDates, reload]);

  const handleClick = (d: Date) => {
    if (currentUser && selectedHabit) {
      addCompletedDayToHabit(selectedHabit, d);
      editHabit(selectedHabit);
      addHabitToUser(currentUser.uid, selectedHabit);
      setSelectedHabit(selectedHabit);
      setReload(!reload);
    }
  };

  let activeDaysIndex = 0;

  return (
    <div className="grid grid-cols-7 text-center gap-x-4 gap-y-3 ">
      {monthDates.map((date) => {
        let isActiveDay = false;
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
              editMode && isDatePastOrToday(date.d) && selectedHabit
                ? () => handleClick(date.d)
                : undefined
            }
          />
        );
      })}
    </div>
  );
};
export default DatesContainer;
