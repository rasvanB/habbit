import { Habit } from "../../context/user.context";
import DayLabels from "../progress-panel/calendar/day-labels.component";
import ProgressCalendarDates from "./progress-calendar-dates.component";
import ProgressCalendarNav from "./progress-calendar-nav.component";
type ProgressCalendarProps = {
  habit: Habit;
};

const ProgressCalendar = ({ habit }: ProgressCalendarProps) => {
  return (
    <div className="bg-[#39393e] p-3 rounded-md">
      <ProgressCalendarNav />
      <DayLabels />
      <ProgressCalendarDates habit={habit} />
    </div>
  );
};

export default ProgressCalendar;
