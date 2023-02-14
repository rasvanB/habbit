import { Habit } from "../../utils/types.utils";
import DayLabels from "../progress-panel/calendar/day-labels.component";
import ProgressCalendarDates from "./progress-calendar-dates.component";
import ProgressCalendarNav from "./progress-calendar-nav.component";
type ProgressCalendarProps = {
  habit: Habit;
};

const ProgressCalendar = ({ habit }: ProgressCalendarProps) => {
  return (
    <div className="dark:bg-[#39393e] bg-white p-3 rounded-md">
      <ProgressCalendarNav />
      <DayLabels />
      <ProgressCalendarDates habit={habit} />
    </div>
  );
};

export default ProgressCalendar;
