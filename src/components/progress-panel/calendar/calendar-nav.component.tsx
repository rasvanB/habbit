/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { useCallback, useContext } from "react";
import { PanelContext } from "../../../context/progress-panel.context";
import {
  getMonthFromNumber,
  nextMonth,
  prevMonth,
} from "../../../utils/calendar.utils";

const CalendarNavigation = () => {
  const { startingDate, setStartingDate } = useContext(PanelContext);

  const handleNextMonth = useCallback(() => {
    setStartingDate(nextMonth(startingDate));
  }, [startingDate]);

  const handlePrevMonth = useCallback(() => {
    setStartingDate(prevMonth(startingDate));
  }, [startingDate]);

  return (
    <div className="flex justify-between dark:text-gray-200">
      <div
        onClick={handlePrevMonth}
        className="flex items-center ml-3 bg-[rgb(48,48,48)] p-2 rounded-lg hover:bg-neutral-700"
      >
        <Icon icon={"ep:arrow-left-bold"} />
      </div>
      <div className="flex gap-1">
        <div className="text-center flex items-center">{`${getMonthFromNumber(
          startingDate.getMonth()
        )}`}</div>
        <div className="text-center flex items-center">{`${startingDate.getFullYear()}`}</div>
      </div>
      <div
        onClick={handleNextMonth}
        className="flex items-center mr-3 bg-[rgb(48,48,48)] p-2 rounded-lg hover:bg-neutral-700"
      >
        <Icon icon={"ep:arrow-right-bold"} />
      </div>
    </div>
  );
};
export default CalendarNavigation;
