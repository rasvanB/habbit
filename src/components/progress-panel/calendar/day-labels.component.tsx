import { weekDays } from "../../../utils/calendar.utils";

const DayLabels = () => {
  return (
    <div className="grid grid-cols-7 text-white text-center">
      {weekDays.map((day) => {
        return <div key={day}>{day.slice(0, 2)}</div>;
      })}
    </div>
  );
};
export default DayLabels;
