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

export const getMonthFromNumber = (x: number): string | undefined => {
  if (x >= 0 && x < 12) {
    return monthNames[x];
  }
};

export const getDatesOfMonth = (currentMonth: Date): { d: Date }[] => {
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const dates: { d: Date }[] = [];
  for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
    dates.push({
      d: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1),
    });
  }
  console.log(dates);

  return dates;
};
export const nextMonth = (currentMonth: Date): Date =>
  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0);

export const prevMonth = (currentMonth: Date): Date =>
  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
