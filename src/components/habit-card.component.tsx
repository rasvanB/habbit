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
      className="dark:text-gray-200 w-[400px] flex items-center mt-2 py-2 px-3 outline outline-1 rounded-sm dark:outline-zinc-600"
      {...otherProps}
    >
      <div
        className="p-1 min-w-[40px] min-h-[40px] rounded-md flex justify-center items-center"
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
      <div className="flex flex-col mx-4">
        <div className="font-bold text-sm">
          {`${habit.name} ${habit.requirement.toLowerCase()} ${habit.goal} ${
            habit.unit
          }`.toUpperCase()}
        </div>
        <div className="text-xs font-semibold dark:text-zinc-400 h-fit">
          current: <span>{`0 / ${habit.goal}`}</span>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
