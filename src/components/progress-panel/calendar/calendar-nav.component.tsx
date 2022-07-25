import { useState } from "react";

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
  } else {
    // maybe throw error
  }
};

const nextMonth = (currentMonth: Date): Date =>
  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);

const prevMonth = (currentMonth: Date): Date =>
  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);

const CalendarNavigation = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  return (
    <div className="flex justify-between dark:text-gray-200">
      <div
        onClick={() => {
          setCurrentMonth(prevMonth(currentMonth));
        }}
      >
        PREV
      </div>
      <div>{`${getMonthFromNumber(currentMonth.getMonth())}`}</div>
      <div
        onClick={() => {
          setCurrentMonth(nextMonth(currentMonth));
        }}
      >
        NEXT
      </div>
    </div>
  );
};
export default CalendarNavigation;
