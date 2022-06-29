import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import HabitCard from "./habit-card.component";

const CardContainer = () => {
  const { habits } = useContext(UserContext);

  useEffect(() => {
    console.log(habits);
  }, [habits]);

  return (
    <div className="flex flex-col mt-5 gap-3 w-full">
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
