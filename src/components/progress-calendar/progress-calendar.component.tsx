import { Habit } from "../../context/user.context";
import ProgressCalendarNav from "./progress-calendar-nav.component";
type ProgressCalendarProps = {
  habit: Habit;
};

const ProgressCalendar = ({ habit }: ProgressCalendarProps) => {
  return (
    <>
      <ProgressCalendarNav />
    </>
  );
};

export default ProgressCalendar;
