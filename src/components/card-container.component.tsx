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
    <div>
      {habits.map((habit) => {
        return (
          <HabitCard
            key={habit.name + Math.floor(Math.random() * 1000)}
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
