import { useContext } from "react";
import { Habit, UserContext } from "../context/user.context";
import HabitCard from "./habit-card.component";
import { deleteHabitFromUser } from "../utils/firebase/firebase.utils";

const CardContainer = () => {
  const { habits, removeHabit, currentUser } = useContext(UserContext);

  const handleRemoveHabit = (habit: Habit) => {
    if (currentUser) {
      removeHabit(habit);
      deleteHabitFromUser(currentUser.uid, habit);
    }
  };
  return (
    <div className="flex flex-col mt-5 gap-3">
      {habits.map((habit) => {
        return (
          <HabitCard
            key={habit.habitName + Math.floor(Math.random() * 1000)}
            habit={habit}
            onClick={() => {
              handleRemoveHabit(habit);
            }}
          />
        );
      })}
    </div>
  );
};
export default CardContainer;
