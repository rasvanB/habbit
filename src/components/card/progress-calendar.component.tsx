import { Habit } from "../../context/user.context";
import Calendar from "../progress-panel/calendar/calendar.component";

type ProgressCalendarProps = {
  habit: Habit;
};

const ProgressCalendar = ({ habit }: ProgressCalendarProps) => {
  return (
    <div>
      <Calendar />
    </div>
  );
};

export default ProgressCalendar;
