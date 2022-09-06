import { getDateAsString } from "../components/card/progress-menu.component";
import { Habit } from "../context/user.context";

// CHECK IF TWO DAYS ARE CONSECUTIVE
export const checkConsecutive = (day1: string, day2: string): boolean => {
  const firstDay = new Date(day1).setUTCHours(0, 0, 0);
  const secondDay = new Date(day2).setUTCHours(0, 0, 0);
  return firstDay - secondDay === 86400000;
};

export const calculateTotalCompletions = (habit: Habit | null): number => {
  if (habit) {
    if (habit.activeDays) {
      let totalCompletions = 0;
      for (let i = 0; i < habit.activeDays.length; i++) {
        const currentDay = habit.activeDays[i];
        totalCompletions += currentDay.progress;
      }
      return totalCompletions;
    }
    return 0;
  }
  return 0;
};

export const calculateHighestStreak = (habit: Habit | null): number => {
  if (habit) {
    if (habit.activeDays) {
      if (habit.activeDays.length > 0) {
        let highestStreak = 0;
        let currentStreak = 0;
        let prevDate = null;
        for (let i = 0; i < habit.activeDays.length; i++) {
          let current = habit.activeDays[i];
          if (current.completed) {
            if (prevDate === null) {
              currentStreak = 1;
              prevDate = current;
            } else {
              if (checkConsecutive(current.date, prevDate.date)) {
                currentStreak++;
                prevDate = current;
              } else {
                currentStreak = 1;
                prevDate = current;
              }
            }
          } else {
            currentStreak = 0;
          }
          if (currentStreak > highestStreak) highestStreak = currentStreak;
        }
        return highestStreak;
      } else return 0;
    }
  }
  return 0;
};

export const calculateCurrentStreak = (habit: Habit | null): number => {
  if (habit) {
    if (habit.activeDays) {
      if (habit.activeDays.length > 0) {
        if (habit.activeDays.length === 1) {
          let lastDay = habit.activeDays[habit.activeDays.length - 1];
          if (lastDay.completed) return 1;
          else return 0;
        } else {
          let prevDay = habit.activeDays[habit.activeDays.length - 1];
          let streak = 0;

          if (
            checkConsecutive(getDateAsString(), prevDay.date) ||
            prevDay.date === getDateAsString()
          ) {
            if (checkConsecutive(getDateAsString(), prevDay.date)) {
              if (prevDay.completed) streak = 1;
              else return streak;
            }
            if (prevDay.date === getDateAsString()) {
              if (prevDay.completed) streak = 1;
            }

            for (let i = habit.activeDays.length - 2; i >= 0; i--) {
              let currentDay = habit.activeDays[i];
              if (checkConsecutive(prevDay.date, currentDay.date)) {
                if (
                  prevDay.date !==
                  habit.activeDays[habit.activeDays.length - 1].date
                ) {
                  if (currentDay.completed && prevDay.completed) {
                    streak++;
                  } else {
                    return streak;
                  }
                } else {
                  if (currentDay.completed) streak++;
                  else return streak;
                }
              } else {
                return streak;
              }
              prevDay = currentDay;
            }
          }
          return streak;
        }
      }
      return 0;
    }
    return 0;
  }
  return 0;
};

export const getProgressByMonth = (selectedHabit: Habit | null): {}[] => {
  if (selectedHabit && selectedHabit.activeDays) {
    let dataAsObj: any = {};
    let dataAsArr = [];
    if (selectedHabit.activeDays.length > 0) {
      for (let i = 0; i < selectedHabit.activeDays.length; i++) {
        let month = selectedHabit.activeDays[i].date.slice(0, -3);
        if (!dataAsObj.hasOwnProperty(month)) {
          Object.assign(dataAsObj, {
            [month]: selectedHabit.activeDays[i].progress,
          });
        } else {
          Object.assign(dataAsObj, {
            [month]: dataAsObj[month] + selectedHabit.activeDays[i].progress,
          });
        }
      }
      for (const property in dataAsObj) {
        dataAsArr.push({ month: property, value: dataAsObj[property] });
      }
    }
    return dataAsArr;
  }
  return [];
};
