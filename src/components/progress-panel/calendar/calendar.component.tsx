import { useCalendarStore } from "../../../utils/store/calendar.store";
import CalendarNavigation from "./calendar-nav.component";
import DatesContainer from "./dates-container.component";
import DayLabels from "./day-labels.component";

const Calendar = () => {
  const setEditMode = useCalendarStore((state) => state.setEditMode);
  return (
    <div className="dark:bg-zinc-800 w-fit dark:text-gray-200 bg-white shadow-sm p-4 rounded-lg mt-3 font-poppins min-w-[348px] ">
      <CalendarNavigation />
      <DayLabels />
      <DatesContainer />
      <button>EDIT</button>
    </div>
  );
};

export default Calendar;
