import { Icon } from "@iconify/react";
import { parse } from "path";
import { useContext } from "react";
import { PanelContext } from "../../context/progress-panel.context";
import { Habit } from "../../context/user.context";
import { getDateAsString } from "../card/progress-menu.component";

// FIXME: THIS SHOULD CHECK IF DAYS ARE COMPLETED OR NOT
const calculateHighestStreak = (habit: Habit | null) => {
  if (habit) {
    if (habit.activeDays) {
      if (habit.activeDays.length > 0) {
        let highestStreak = 0;
        let currentStreak = 0;
        let prevDate = 0;
        for (let i = 0; i < habit.activeDays.length; i++) {
          let current = habit.activeDays[i];
          let currentDate = parseInt(current.date.slice(0, 2));
          if (current.completed) {
            if (prevDate === 0) {
              currentStreak = 1;
              prevDate = currentDate;
            } else {
              if (currentDate === prevDate + 1) {
                currentStreak++;
                prevDate = currentDate;
              } else {
                currentStreak = 1;
                prevDate = currentDate;
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

const calculateCurrentStreak = (habit: Habit | null) => {
  if (habit) {
    if (habit.activeDays) {
      if (habit.activeDays.length > 0) {
        let noOfDays = habit.activeDays.length;
        let lastDay = habit.activeDays[noOfDays - 1];
        let startingIndex = 0;
        const todayDate = getDateAsString();
        if (lastDay.date === todayDate) {
          if (lastDay.completed) {
            startingIndex = noOfDays - 1;
          } else {
            if (habit.activeDays.length > 1) {
              if (habit.activeDays[habit.activeDays.length - 2].completed) {
                startingIndex = noOfDays - 2;
              }
            } else return 0;
          }
        } else {
          let lastDayNumber = parseInt(lastDay.date.slice(0, 2));
          if (lastDayNumber === parseInt(todayDate.slice(0, 2)) - 1) {
            if (lastDay.completed) startingIndex = noOfDays - 1;
            else return 0;
          } else {
            return 0;
          }
        }
      } else {
        // has one item
      }
    } else return 0;
  } else return 0;
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
