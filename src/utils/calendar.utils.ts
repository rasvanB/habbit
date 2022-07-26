export const monthNames: { [key: number]: string } = {
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

export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getMonthFromNumber = (x: number): string | undefined => {
  if (x >= 0 && x < 12) {
    return monthNames[x];
  }
};

export const getDatesOfMonth = (
  currentMonth: Date
): { d: Date; active: boolean }[] => {
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const firstDayOfMonthWeekDay = firstDayOfMonth.getDay();

  const previousMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    0
  );

  const previousMonthLastDay = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0
  );
  const dates: { d: Date; active: boolean }[] = [];

  for (let i = 0; i < firstDayOfMonthWeekDay; i++) {
    dates.push({
      d: new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth(),
        previousMonthLastDay.getDate() - firstDayOfMonthWeekDay + i + 1
      ),
      active: false,
    });
  }
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
    dates.push({
      d: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1),
      active: true,
    });
  }
  return dates;
};
export const nextMonth = (currentMonth: Date): Date =>
  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);

export const prevMonth = (currentMonth: Date): Date =>
  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
