import { Icon } from "@iconify/react";
import { FC } from "react";
import { Habit } from "../context/user.context";
import hexToRgba from "hex-to-rgba";

type CardProps = {
  habit: Habit;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const HabitCard: FC<CardProps> = ({ habit, ...otherProps }) => {
  return (
    <div
      className="dark:text-gray-200 flex items-center mt-2 ml-1 outline outline-2 rounded-sm dark:outline-zinc-500 p-1"
      {...otherProps}
    >
      <div
        className="p-1 rounded-md w-[35px] h-[35px] flex justify-center items-center"
        style={{
          backgroundColor: hexToRgba(habit.iconColor, 0.3),
        }}
      >
        <Icon
          icon={habit.iconName}
          style={{ color: habit.iconColor }}
          className="text-2xl"
        />
      </div>
      <div>{`${habit.name} ${habit.requirement.toLowerCase()} ${habit.goal} ${
        habit.unit
      }`}</div>
    </div>
  );
};

export default HabitCard;
