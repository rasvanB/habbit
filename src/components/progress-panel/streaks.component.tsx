import { Icon } from "@iconify/react";
import { useContext } from "react";
import { PanelContext } from "../../context/progress-panel.context";
import { Habit } from "../../context/user.context";

// CHECK IF TWO DAYS ARE CONSECUTIVE
const checkConsecutive = (day1: string, day2: string): boolean => {
  const firstDay = new Date(day1).setUTCHours(0, 0, 0);
  const secondDay = new Date(day2).setUTCHours(0, 0, 0);
  return firstDay - secondDay === 86400000;
};

// FIXME: THIS SHOULD CHECK IF DAYS ARE COMPLETED OR NOT
const calculateHighestStreak = (habit: Habit | null): number => {
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

const calculateCurrentStreak = (habit: Habit | null): number => {
  if (habit) {
    if (habit.activeDays) {
      if (habit.activeDays.length > 0) {
        console.log(new Date());
      }
    }
  }
  return 0;
};

const Streaks = () => {
  const { selectedHabit } = useContext(PanelContext);
  const highestStreak = calculateHighestStreak(selectedHabit);
  const currentStreak = calculateCurrentStreak(selectedHabit);

  // TODO: change second highest streak to current streak using built function
  return (
    <div className="flex">
      <div className="border-gray-600  dark:bg-zinc-800 w-fit dark:text-gray-200 p-4 rounded-lg">
        <div className="flex justify-center items-center">
          <Icon
            icon="ant-design:fire-filled"
            className="text-2xl text-orange-400"
          />
          <div className="ml-2 font-semibold text-xl">{`${highestStreak} ${
            highestStreak !== 1 ? "DAYS" : "DAY"
          }`}</div>
        </div>
        <div className=" font-semibold text-xs">LONGEST STREAK</div>
      </div>
      <div className="border-gray-600 dark:bg-zinc-800 w-fit dark:text-gray-200 p-4 rounded-lg ml-3">
        <div className="flex justify-center items-center">
          <Icon
            icon="ant-design:fire-filled"
            className="text-2xl text-blue-300"
          />
          <div className="ml-2 font-semibold text-xl">{`${currentStreak} ${
            currentStreak !== 1 ? "DAYS" : "DAY"
          }`}</div>
        </div>
        <div className="font-semibold text-xs text-center">CURRENT STREAK</div>
      </div>
    </div>
  );
};

export default Streaks;
