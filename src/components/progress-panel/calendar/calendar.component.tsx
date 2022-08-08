import CalendarNavigation from "./calendar-nav.component";
import DatesContainer from "./dates-container.component";
import DayLabels from "./day-labels.component";

const Calendar = () => {
  return (
    <div className="dark:bg-zinc-800 w-fit dark:text-gray-200 bg-white shadow-sm p-4 rounded-lg mt-3 font-poppins">
      <CalendarNavigation />
      <DayLabels />
      <DatesContainer />
    </div>
  );
};

export default Calendar;
