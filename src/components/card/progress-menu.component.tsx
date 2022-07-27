import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";
import { PanelContext } from "../../context/progress-panel.context";
import { Habit, UserContext } from "../../context/user.context";
import { addHabitToUser } from "../../utils/firebase/firebase.utils";
import Button from "../other/button.component";
import { getProgressOfToday } from "./habit-card.component";

type ProgressMenuProps = {
  isOpen: boolean;
  habit: Habit;
  close: () => void;
};

export const getDateAsString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${
    d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()
  }-${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`;
};

const ProgressMenu = ({ isOpen, habit, close }: ProgressMenuProps) => {
  const [progress, setProgress] = useState(getProgressOfToday(habit));
  const { currentUser, editHabit } = useContext(UserContext);
  const { setSelectedHabit } = useContext(PanelContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      if (habit.requirement.toLowerCase() === "at least") {
        if (parseInt(value) <= 100) {
          setProgress(parseFloat(value));
        }
      } else {
        if (parseInt(value) >= habit.goal) {
          setProgress(habit.goal);
        } else {
          setProgress(parseInt(value));
        }
      }
    } else setProgress(0);
  };

  const handleIncrement = (isIncrement: boolean) => {
    if (isIncrement) {
      if (habit.requirement.toLowerCase() === "at least") {
        if (progress < 100) {
          setProgress(progress + 1);
        }
      } else {
        if (progress < habit.goal) {
          setProgress(progress + 1);
        }
      }
    } else {
      if (progress > 0) setProgress(progress - 1);
    }
  };

  const handleClose = () => {
    setProgress(getProgressOfToday(habit));
    close();
  };

  const handleConfirm = () => {
    if (progress !== getProgressOfToday(habit)) {
      if (currentUser) {
        const newHabit = { ...habit };
        newHabit.timeStamp = habit.timeStamp;
        if (newHabit.activeDays.length > 0) {
          if (
            newHabit.activeDays[newHabit.activeDays.length - 1].date ===
            getDateAsString()
          ) {
            newHabit.activeDays.pop();
            newHabit.activeDays.push({
              date: getDateAsString(),
              progress: progress,
              completed: progress >= habit.goal,
            });
          } else {
            newHabit.activeDays.push({
              date: getDateAsString(),
              progress: progress,
              completed: progress >= habit.goal,
            });
          }
        } else {
          newHabit.activeDays.push({
            date: getDateAsString(),
            progress: progress,
            completed: progress >= habit.goal,
          });
        }

        editHabit(newHabit);
        addHabitToUser(currentUser.uid, newHabit);
        setSelectedHabit(newHabit);
        close();
      }
    } else close();
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute top-8 right-0 z-10 flex-col dark:bg-neutral-800 bg-white outline outline-1 dark:outline-zinc-600
      outline-zinc-300 rounded-md `}
    >
      <div className="whitespace-nowrap text-sm font-semibold dark:text-neutral-400 text-neutral-500 text-center mb-1 px-2 pt-2">
        Enter a value
      </div>
      <div className="flex items-center justify-center px-2">
        <Button buttonStyle="increment" onClick={() => handleIncrement(false)}>
          <Icon icon="bx:minus" />
        </Button>
        <input
          type="text"
          className="h-[30px] w-[70px] dark:bg-white bg-black bg-opacity-5 dark:bg-opacity-10 outline outline-0 outline-zinc-200 dark:outline-zinc-600 text-center focus:outline-1 font-semibold "
          value={progress}
          onChange={handleChange}
        />
        <Button buttonStyle="decrement" onClick={() => handleIncrement(true)}>
          <Icon icon="bi:plus" />
        </Button>
      </div>
      <div className="text-center text-xs mt-1 font-semibold dark:text-neutral-400 text-neutral-500">
        Goal
      </div>
      <div className="text-center text-sm font-semibold">{`${habit.requirement} ${habit.goal}`}</div>
      <div className="flex justify-between border border-b-0 border-x-0 mt-2 dark:border-neutral-700">
        <button
          className="text-center text-xs font-poppins w-full p-2 border-r-[1px] dark:border-neutral-700 text-blue-500 hover:text-blue-600"
          onClick={handleConfirm}
        >
          CONFIRM
        </button>
        <button
          className="text-center text-xs font-poppins w-full p-2 dark:text-gray-300"
          onClick={handleClose}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};
export default ProgressMenu;
