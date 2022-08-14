import { useContext } from "react";
import { Habit, UserContext } from "../../context/user.context";
import HabitCard, { getDataOfToday } from "./habit-card.component";

const CardContainer = () => {
  const { habits } = useContext(UserContext);
  const completedHabits: Habit[] = [];
  const incompleteHabits: Habit[] = [];

  habits.forEach((habit) => {
    const today = getDataOfToday(habit);
    if (today) {
      if (today.completed) completedHabits.push(habit);
      else incompleteHabits.push(habit);
    } else incompleteHabits.push(habit);
  });

  return (
    <div className="pr-3 lg:pr-0">
      <div className="flex flex-col mt-3 gap-3 w-full border-t pt-2 dark:border-zinc-600">
        <div className="font-medium text-md dark:text-gray-300">{`Active: ${incompleteHabits.length}`}</div>
        {incompleteHabits.map((habit) => {
          return (
            <HabitCard
              key={habit.habitName + Math.floor(Math.random() * 1000)}
              habit={habit}
              completed={false}
            />
          );
        })}
      </div>
      <div className="flex flex-col mt-2 gap-3 w-full border-t pt-2 dark:border-zinc-600">
        <div className="font-medium text-md dark:text-gray-300">
          {`Completed: ${completedHabits.length}`}
        </div>
        {completedHabits.map((habit) => {
          return (
            <HabitCard
              key={habit.habitName + Math.floor(Math.random() * 1000)}
              habit={habit}
              completed
            />
          );
        })}
      </div>
    </div>
  );
};
export default CardContainer;
