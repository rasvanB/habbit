import React from "react";
import { Habit } from "../context/user.context";
import CardMenuItem from "./card-menu-item.component";

const CardMenu = ({
  isOpen,
  removeHabit,
  ...otherProps
}: {
  isOpen: boolean;
  removeHabit: (habit: Habit) => void;
} & React.ClassAttributes<HTMLDivElement>) => {
  return (
    <div
      {...otherProps}
      className={`${
        isOpen ? "top-0 opacity-100" : "-top-[1000px] opacity-0"
      } select-none flex flex-col absolute dark:bg-zinc-700 dark:text-gray-200 font-poppins text-sm -right-24 rounded-sm transition-opacity `}
    >
      <CardMenuItem />
      <CardMenuItem />
      <CardMenuItem />
    </div>
  );
};

export default CardMenu;
