import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Habit } from "../../context/user.context";
import Button from "../other/button.component";

type ProgressMenuProps = {
  isOpen: boolean;
  habit: Habit;
};
const ProgressMenu = ({ isOpen, habit }: ProgressMenuProps) => {
  const [progress, setProgress] = useState(habit.progress);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) setProgress(parseInt(value));
    else setProgress(0);
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute top-8 right-0 flex-col bg-neutral-800 outline outline-1 dark:outline-zinc-600 rounded-md `}
    >
      <div className="whitespace-nowrap text-sm font-semibold dark:text-neutral-400 text-center mb-1 px-2 pt-2">
        Enter a value
      </div>
      <div className="flex items-center justify-center px-2">
        <Button buttonStyle="increment">
          <Icon icon="bx:minus" />
        </Button>
        <input
          type="text"
          className="h-[30px] w-[70px] dark:bg-white dark:bg-opacity-5 outline outline-0 outline-zinc-200 dark:outline-zinc-600 text-center focus:outline-1"
          value={progress}
          onChange={handleChange}
        />
        <Button buttonStyle="decrement">
          <Icon icon="bi:plus" />
        </Button>
      </div>
      <div className="text-center text-xs mt-1 font-semibold dark:text-neutral-400">
        Goal
      </div>
      <div className="text-center text-sm font-semibold">{`${habit.requirement} ${habit.goal}`}</div>
      <div className="flex justify-between border border-b-0 border-x-0 mt-2 border-neutral-700">
        <button className="text-center text-xs font-poppins w-full p-2 border-r-[1px] border-neutral-700 text-blue-400 hover:text-blue-500">
          CONFIRM
        </button>
        <button className="text-center text-xs font-poppins w-full p-2 dark:text-gray-300">
          CANCEL
        </button>
      </div>
    </div>
  );
};
export default ProgressMenu;
