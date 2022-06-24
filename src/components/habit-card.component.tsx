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
      className="dark:text-gray-200 dark:bg-neutral-800 bg-gray-100 w-[400px] flex items-center pr-3 rounded-md dark:outline-zinc-600"
      {...otherProps}
      style={{
        border: `2px solid ${hexToRgba(habit.iconColor, 0.6)}`,
      }}
    >
      <div
        className="p-1 h-14 w-14 rounded-sm flex justify-center items-center"
        style={{
          backgroundColor: hexToRgba(habit.iconColor, 0.4),
        }}
      >
        <Icon
          icon={habit.iconName}
          style={{ color: habit.iconColor }}
          className="text-3xl"
        />
      </div>
      <div className="flex flex-col mx-4 my-2 ">
        <div className="font-bold text-sm text-zinc-700 dark:text-gray-200">
          {`${habit.habitName} ${habit.requirement.toLowerCase()} ${
            habit.goal
          } ${habit.unit}`.toUpperCase()}
        </div>
        <div className="text-xs font-semibold dark:text-zinc-400 text-zinc-400 h-fit">
          current: <span>{`0 / ${habit.goal}`}</span>
        </div>
      </div>
      <div className="ml-auto">
        <Icon
          icon="jam:plus-rectangle-f"
          className="text-2xl text-blue-400 cursor-pointer hover:text-blue-300"
        />
      </div>
    </div>
  );
};

export default HabitCard;
