import { weekDays } from "../../../utils/calendar.utils";

const DayLabels = () => {
  return (
    <div className="grid grid-cols-7 text-neutral-400 text-center gap-4 mt-3 select-none mb-1">
      {weekDays.map((day) => {
        return (
          <div key={day} className="text-center">
            {day.slice(0, 2)}
          </div>
        );
      })}
    </div>
  );
};
export default DayLabels;
