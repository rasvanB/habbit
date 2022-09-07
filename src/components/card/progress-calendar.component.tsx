import { Habit } from "../../context/user.context";

type ProgressCalendarProps = {
  habit: Habit;
};

const ProgressCalendar = ({ habit }: ProgressCalendarProps) => {
  return <div>{habit.habitName}</div>;
};

export default ProgressCalendar;
