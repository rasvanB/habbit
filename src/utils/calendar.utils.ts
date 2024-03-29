import { compareAsc } from "date-fns";

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

export const areDatesEqual = (d1: Date, d2: Date) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const isDatePastOrToday = (d: Date) => {
  const today = new Date();
  if (compareAsc(d, today) === -1) return true;
};

const partsOfDay = ["morning", "afternoon", "evening"] as const;

export const getPartOfDayFromTimeString = (d: Date) => {
  const [hours, minutes]: number[] = [d.getHours(), d.getMinutes()];
  const hoursPlusMinutes: number = hours * 100 + minutes;
  if (hoursPlusMinutes >= 500 && hoursPlusMinutes <= 1200) {
    return partsOfDay[0];
  } else {
    if (hoursPlusMinutes > 1200 && hoursPlusMinutes <= 1700) {
      return partsOfDay[1];
    } else return partsOfDay[2];
  }
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

export const checkDatesEqual = (d1: Date, d2: Date) => {
  if (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
    return true;
  return false;
};
