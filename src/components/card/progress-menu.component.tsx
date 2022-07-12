import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";
import { Habit, UserContext } from "../../context/user.context";
import { addHabitToUser } from "../../utils/firebase/firebase.utils";
import Button from "../other/button.component";

type ProgressMenuProps = {
  isOpen: boolean;
  habit: Habit;
  close: () => void;
};

const ProgressMenu = ({ isOpen, habit, close }: ProgressMenuProps) => {
  const [progress, setProgress] = useState(habit.progress);
  const { currentUser, editHabit } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      if (habit.requirement.toLowerCase() !== "at least")
        setProgress(parseFloat(value));
      else {
        if (parseInt(value) >= habit.goal) {
          setProgress(habit.goal);
        }
      }
    } else setProgress(0);
  };

  const handleIncrement = (isIncrement: boolean) => {
    if (isIncrement) setProgress(progress + 1);
    else if (progress > 0) setProgress(progress - 1);
  };

  const handleConfirm = () => {
    if (progress !== habit.progress) {
      if (currentUser) {
        const newHabit = { ...habit };
        newHabit.progress = progress;
        newHabit.timeStamp = habit.timeStamp;
        editHabit(newHabit);
        addHabitToUser(currentUser.uid, newHabit);
        close();
      }
    } else {
      close();
    }
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute top-8 right-0 z-10 flex-col bg-neutral-800 outline outline-1 dark:outline-zinc-600 rounded-md `}
    >
      <div className="whitespace-nowrap text-sm font-semibold dark:text-neutral-400 text-center mb-1 px-2 pt-2">
        Enter a value
      </div>
      <div className="flex items-center justify-center px-2">
        <Button buttonStyle="increment" onClick={() => handleIncrement(false)}>
          <Icon icon="bx:minus" />
        </Button>
        <input
          type="text"
          className="h-[30px] w-[70px] dark:bg-white dark:bg-opacity-5 outline outline-0 outline-zinc-200 dark:outline-zinc-600 text-center focus:outline-1"
          value={progress}
          onChange={handleChange}
        />
        <Button buttonStyle="decrement" onClick={() => handleIncrement(true)}>
          <Icon icon="bi:plus" />
        </Button>
      </div>
      <div className="text-center text-xs mt-1 font-semibold dark:text-neutral-400">
        Goal
      </div>
      <div className="text-center text-sm font-semibold">{`${habit.requirement} ${habit.goal}`}</div>
      <div className="flex justify-between border border-b-0 border-x-0 mt-2 border-neutral-700">
        <button
          className="text-center text-xs font-poppins w-full p-2 border-r-[1px] border-neutral-700 text-blue-400 hover:text-blue-500"
          onClick={handleConfirm}
        >
          CONFIRM
        </button>
        <button
          className="text-center text-xs font-poppins w-full p-2 dark:text-gray-300"
          onClick={close}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};
export default ProgressMenu;
