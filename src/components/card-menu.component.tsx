import React from "react";
import { Habit } from "../context/user.context";

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
        isOpen ? "flex" : "hidden"
      } flex-col dark:bg-zinc-700 dark:text-gray-200 font-poppins text-sm absolute top-0 -right-24 rounded-sm`}
    >
      <h1>card menu</h1>
    </div>
  );
};

export default CardMenu;
