import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { Habit } from "../../context/user.context";
import hexToRgba from "hex-to-rgba";
import CardMenu from "./card-menu.component";
import ProgressMenu, { getDateAsString } from "./progress-menu.component";
import CompleteMenu from "./complete-menu.component";

type CardProps = {
  habit: Habit;
} & React.BaseHTMLAttributes<HTMLDivElement>;

export const getProgressOfToday = (habit: Habit) => {
  if (habit.activeDays)
    if (
      habit.activeDays.length > 0 &&
      habit.activeDays[habit.activeDays.length - 1].date === getDateAsString()
    ) {
      return habit.activeDays[habit.activeDays.length - 1].progress;
    } else return 0;
  else return 0;
};

const HabitCard = ({ habit, ...otherProps }: CardProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProgressOpen, setProgressOpen] = useState(false);
  const [isCompleteOpen, setCompleteOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (e: any) => {
      if (
        menuRef.current !== e.composedPath()[1] &&
        menuRef.current !== e.composedPath()[2]
      ) {
        setMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeMenu);
    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

  const closeProgressMenu = () => {
    setProgressOpen(false);
  };

  const closeCompleteMenu = () => {
    setCompleteOpen(false);
  };

  return (
    <div
      className="relative dark:text-gray-200 dark:bg-neutral-800 dark:hover:bg-[rgb(45,45,45)] flex items-center lg:pr-10 pr-8 rounded-sm dark:outline-zinc-700 select-none pl-2 py-1 w-full lg:max-w-[600px] outline outline-1 outline-gray-200"
      {...otherProps}
    >
      <div
        className="p-2 md:p-3 h-full rounded-md flex items-center justify-center my-2 lg:my-1"
        style={{
          backgroundColor: hexToRgba(habit.iconColor, 0.4),
        }}
      >
        <Icon
          icon={habit.iconName}
          style={{ color: habit.iconColor }}
          className=" w-[25px] h-[25px]"
        />
      </div>

      <div className="flex flex-col w-full mx-3 lg:mx-4">
        <div className="font-bold text-sm text-zinc-700 dark:text-gray-200 flex flex-col">
          <div className="truncate max-w-[150px] mobile:max-w-[250px] sm:max-w-[350px] leading-none">
            {`${habit.habitName}`.toUpperCase()}
          </div>
          <div className="truncate leading-tight">
            {`${habit.requirement} ${habit.goal} ${habit.unit}`.toUpperCase()}
          </div>
        </div>
        <div className="text-xs font-semibold dark:text-zinc-400 text-zinc-400 h-fit leading-none">
          current: <span>{`${getProgressOfToday(habit)} / ${habit.goal}`}</span>
        </div>
      </div>
      <div className="relative">
        <div className="ml-auto rounded-md hover:scale-110 transition-transform dark:bg-zinc-700 bg-gray-100 outline outline-1 dark:outline-zinc-600 outline-zinc-300">
          <Icon
            icon={habit.goal === 1 ? "eva:checkmark-outline" : "bi:plus"}
            className={`text-2xl cursor-pointer ${
              habit.goal === 1 ? "p-1" : ""
            } dark:text-white text-zinc-700`}
            onClick={() => {
              if (habit.goal !== 1) {
                setProgressOpen(true);
              } else {
                setCompleteOpen(true);
              }
            }}
          />
        </div>
        {habit.goal === 1 ? (
          <CompleteMenu
            isOpen={isCompleteOpen}
            habit={habit}
            close={closeCompleteMenu}
          />
        ) : (
          <ProgressMenu
            isOpen={isProgressOpen}
            habit={habit}
            close={closeProgressMenu}
          />
        )}
      </div>
      <div
        ref={menuRef}
        onClick={() => {
          setMenuOpen(true);
        }}
        className="absolute top-2 right-1 cursor-pointer"
      >
        <Icon icon="fluent:more-vertical-28-filled" />
      </div>
      <CardMenu isOpen={isMenuOpen} habit={habit} />
    </div>
  );
};

export default HabitCard;
