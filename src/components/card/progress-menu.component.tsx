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

export const getDateAsString = () => {
  const d = new Date();
  return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
};

const ProgressMenu = ({ isOpen, habit, close }: ProgressMenuProps) => {
  const [progress, setProgress] = useState(habit.progress);
  const [completedDay, setCompletedDay] = useState("");
  const { currentUser, editHabit } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      if (habit.requirement.toLowerCase() === "at least") {
        if (parseInt(value) <= 100) {
          if (parseInt(value) >= habit.goal) {
            setCompletedDay(getDateAsString());
          } else setCompletedDay("");
          setProgress(parseFloat(value));
        }
      } else {
        if (parseInt(value) >= habit.goal) {
          setCompletedDay(getDateAsString());
          setProgress(habit.goal);
        } else {
          setCompletedDay("");
          setProgress(parseInt(value));
        }
      }
    } else setProgress(0);
  };

  const handleIncrement = (isIncrement: boolean) => {
    if (isIncrement) {
      if (habit.requirement.toLowerCase() === "at least") {
        if (progress < 100) {
          if (progress >= habit.goal - 1) {
            setCompletedDay(getDateAsString());
          } else setCompletedDay("");

          setProgress(progress + 1);
        }
      } else {
        if (progress < habit.goal) {
          if (progress === habit.goal - 1) {
            setCompletedDay(getDateAsString());
          } else setCompletedDay("");

          setProgress(progress + 1);
        }
      }
    } else {
      if (progress > 0) setProgress(progress - 1);
    }
  };

  const handleClose = () => {
    setProgress(habit.progress);
    close();
  };

  const handleConfirm = () => {
    if (progress !== habit.progress) {
      if (currentUser) {
        const newHabit = { ...habit };
        newHabit.progress = progress;
        newHabit.timeStamp = habit.timeStamp;
        if (completedDay) {
          if (
            newHabit.completedDays[newHabit.completedDays.length - 1].date !==
            completedDay
          ) {
            newHabit.completedDays.push({
              date: completedDay,
              progress: progress,
            });
          }
        }
        editHabit(newHabit);
        addHabitToUser(currentUser.uid, newHabit);
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
