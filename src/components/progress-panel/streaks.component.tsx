import { Icon } from "@iconify/react";
import { useContext } from "react";
import { PanelContext } from "../../context/progress-panel.context";
import { Habit } from "../../context/user.context";

const calculateHighestStreak = (habit: Habit | null) => {
  if (habit) {
    if (habit.activeDays) {
      if (habit.activeDays.length > 0) {
        let highestStreak = 1;
        let prev = parseInt(habit.activeDays[0].date.slice(0, 2));
        for (let i = 1; i < habit.activeDays.length; i++) {
          let current = parseInt(habit.activeDays[i].date.slice(0, 2));
          if (current === prev + 1) highestStreak++;
          else {
            highestStreak = 1;
          }
          prev = current;
        }
        return highestStreak;
      } else return 0;
    }
  }
  return 0;
};

// const calculateCurrentStreak = (habit: Habit | null) => {

// }

const Streaks = () => {
  const { selectedHabit } = useContext(PanelContext);
  const highestStreak = calculateHighestStreak(selectedHabit);

  return (
    <div className="dark:bg-zinc-800 w-fit dark:text-gray-200 flex">
      <div className="">
        <div className="flex justify-center items-center">
          <Icon icon="fxemoji:fire" className="text-2xl" />
          <div className="ml-2 font-semibold text-xl">{`${highestStreak} ${
            highestStreak !== 1 ? "DAYS" : "DAY"
          }`}</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Streaks;
