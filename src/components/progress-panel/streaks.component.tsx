import { useContext } from "react";
import { PanelContext } from "../../context/progress-panel.context";
import { Habit } from "../../context/user.context";

const calculateHighestStreak = (habit: Habit | null) => {
  if (habit) {
    if (habit.activeDays) {
      if (habit.activeDays.length > 0) {
        let highestStreak = 1;
        const prev = parseInt(habit.activeDays[0].date.slice(0, 2));
        for (let i = 1; i < habit.activeDays.length; i++) {
          let current = parseInt(habit.activeDays[i].date.slice(0, 2));
          if (current === prev + 1) highestStreak++;
        }
        return highestStreak;
      } else return 1;
    }
  }
};

// const calculateCurrentStreak = (habit: Habit | null) => {

// }

const Streaks = () => {
  const { selectedHabit } = useContext(PanelContext);
  const highestStreak = calculateHighestStreak(selectedHabit);

  return (
    <div className="dark:bg-zinc-800 w-fit dark:text-gray-200 flex">
      <div className="font-semibold text-xl">{highestStreak}</div>
      <div></div>
    </div>
  );
};

export default Streaks;
