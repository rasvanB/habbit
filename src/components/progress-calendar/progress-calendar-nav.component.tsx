import { Icon } from "@iconify/react";
import { useContext } from "react";
import { ProgressCalendarContext } from "../../context/progress-calendar.contex";

import {
  getMonthFromNumber,
  nextMonth,
  prevMonth,
} from "../../utils/calendar.utils";

const ProgressCalendarNav = () => {
  const { selectedDate, setSelectedDate } = useContext(ProgressCalendarContext);

  const handleNextMonth = () => {
    setSelectedDate(nextMonth(selectedDate));
  };

  const handlePrevMonth = () => {
    setSelectedDate(prevMonth(selectedDate));
  };

  return (
    <div className="flex justify-between dark:text-gray-200 text-neutral-600 select-none">
      <div
        onClick={handlePrevMonth}
        className="flex items-center ml-3 dark:bg-[rgb(48,48,48)] bg-neutral-100 shadow-sm p-2 rounded-lg hover:dark:bg-neutral-700 hover:bg-neutral-200 cursor-pointer"
      >
        <Icon icon={"ep:arrow-left-bold"} />
      </div>
      <div className="flex gap-1">
        <div className="text-center flex items-center">{`${getMonthFromNumber(
          selectedDate.getMonth()
        )}`}</div>
        <div className="text-center flex items-center">{`${selectedDate.getFullYear()}`}</div>
      </div>
      <div
        onClick={handleNextMonth}
        className="flex items-center mr-3 dark:bg-[rgb(48,48,48)] bg-neutral-100 shadow-sm p-2 rounded-lg hover:dark:bg-neutral-700 hover:bg-neutral-200  cursor-pointer"
      >
        <Icon icon={"ep:arrow-right-bold"} />
      </div>
    </div>
  );
};
export default ProgressCalendarNav;
