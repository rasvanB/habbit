import { Habit } from "../../context/user.context";
import CalendarNavigation from "../progress-panel/calendar/calendar-nav.component";
type ProgressCalendarProps = {
  habit: Habit;
};

const ProgressCalendar = ({ habit }: ProgressCalendarProps) => {
  return (
    <div>
      <CalendarNavigation />
    </div>
  );
};

export default ProgressCalendar;
