import { Icon } from "@iconify/react";
import { useContext } from "react";
import { PanelContext } from "../../context/progress-panel.context";
import { Habit } from "../../context/user.context";
import { getDateAsString } from "../card/progress-menu.component";

// CHECK IF TWO DAYS ARE CONSECUTIVE
const checkConsecutive = (day1: string, day2: string): boolean => {
  const firstDay = new Date(day1).setUTCHours(0, 0, 0);
  const secondDay = new Date(day2).setUTCHours(0, 0, 0);
  return firstDay - secondDay === 86400000;
};

const calculateTotalCompletions = (habit: Habit | null): number => {
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

const Stats = () => {
  const { selectedHabit } = useContext(PanelContext);
  const highestStreak = calculateHighestStreak(selectedHabit);
  const currentStreak = calculateCurrentStreak(selectedHabit);
  const totalCompletions = calculateTotalCompletions(selectedHabit);
  return (
    <div className="flex justify-between gap-3">
      <div className="border-gray-600 dark:bg-zinc-800 bg-white shadow-sm w-full dark:text-gray-200 p-4 rounded-lg">
        <div className="flex justify-center items-center">
          <Icon
            icon="ant-design:fire-filled"
            className="text-2xl text-orange-400"
          />
          <div className="ml-2 font-semibold text-xl">{`${highestStreak} ${
            highestStreak !== 1 ? "DAYS" : "DAY"
          }`}</div>
        </div>
        <div className=" font-semibold text-xs text-center mt-1">
          LONGEST STREAK
        </div>
      </div>
      <div className="border-gray-600 dark:bg-zinc-800 bg-white shadow-sm w-full dark:text-gray-200 p-4 rounded-lg">
        <div className="flex justify-center items-center">
          <Icon
            icon="ant-design:fire-filled"
            className="text-2xl text-blue-300"
          />
          <div className="ml-2 font-semibold text-xl">{`${currentStreak} ${
            currentStreak !== 1 ? "DAYS" : "DAY"
          }`}</div>
        </div>
        <div className="font-semibold text-xs text-center mt-1">
          CURRENT STREAK
        </div>
      </div>
      <div className="border-gray-600  dark:bg-zinc-800 bg-white shadow-sm w-full dark:text-gray-200 p-4 rounded-lg">
        <div className="flex justify-center items-center">
          <Icon
            icon="akar-icons:circle-check-fill"
            className="text-2xl text-green-500"
          />
          <div className="ml-2 font-semibold text-xl">{`${totalCompletions} ${selectedHabit?.unit}`}</div>
        </div>
        <div className=" font-semibold text-xs text-center mt-1">
          TOTAL PROGRESS
        </div>
      </div>
    </div>
  );
};

export default Stats;
