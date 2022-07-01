import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import HabitCard from "./habit-card.component";

const CardContainer = () => {
  const { habits } = useContext(UserContext);

  return (
    <div className="flex flex-col mt-5 gap-5 w-full">
      {habits.map((habit) => {
        return (
          <HabitCard
            key={habit.habitName + Math.floor(Math.random() * 1000)}
            habit={habit}
          />
        );
      })}
    </div>
  );
};
export default CardContainer;
