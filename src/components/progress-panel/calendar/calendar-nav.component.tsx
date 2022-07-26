/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext } from "react";
import { PanelContext } from "../../../context/progress-panel.context";

const monthNames: { [key: number]: string } = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const getMonthFromNumber = (x: number): string | undefined => {
  if (x >= 0 && x < 12) {
    return monthNames[x];
  }
};

const nextMonth = (currentMonth: Date): Date =>
  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);

const prevMonth = (currentMonth: Date): Date =>
  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);

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
      <div>
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
