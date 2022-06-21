import { FC } from "react";
import { Habit } from "../context/user.context";

type CardProps = {
  habit: Habit;
};

const HabitCard: FC<CardProps> = ({ habit }) => {
  return <h1>{habit.name}</h1>;
};

export default HabitCard;
