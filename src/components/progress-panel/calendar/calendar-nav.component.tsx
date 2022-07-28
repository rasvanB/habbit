/* eslint-disable react-hooks/exhaustive-deps */
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
      <div onClick={handlePrevMonth}>PREV</div>
      <div className="flex gap-1">
        <div className="text-center">{`${getMonthFromNumber(
          startingDate.getMonth()
        )}`}</div>
        <div className="text-center">{`${startingDate.getFullYear()}`}</div>
      </div>
      <div onClick={handleNextMonth}>NEXT</div>
    </div>
  );
};
export default CalendarNavigation;
