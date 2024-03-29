import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import hexToRgba from "hex-to-rgba";
import CardMenu from "./card-menu.component";
import ProgressMenu from "./progress-menu.component";
import CompleteMenu from "./complete-menu.component";
import { getDataOfToday, getProgressOfToday } from "../../utils/stats.utils";
import { Habit } from "../../utils/types.utils";
import { usePanelStore } from "../../utils/store/panel.store";

type CardProps = {
  habit: Habit;
  completed: boolean;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const HabitCard = ({ habit, completed, ...otherProps }: CardProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProgressOpen, setProgressOpen] = useState(false);
  const [isCompleteOpen, setCompleteOpen] = useState(false);
  const setSelectedHabit = usePanelStore((state) => state.setSelectedHabit);
  const setSelectedDate = usePanelStore((state) => state.setSelectedDate);
  const setOpen = usePanelStore((state) => state.setOpen);

  const cardRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenus = (e: MouseEvent) => {
      if (
        menuRef.current !== e.composedPath()[1] &&
        menuRef.current !== e.composedPath()[2]
      ) {
        setMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeMenus);
    return () => document.body.removeEventListener("click", closeMenus);
  }, []);

  useEffect(() => {
    const closeCard = (e: MouseEvent) => {
      if (
        cardRef.current === e.composedPath()[1] ||
        cardRef.current === e.composedPath()[2]
      ) {
        handleClick();
      }
    };
    document.body.addEventListener("click", closeCard);
    return () => document.body.removeEventListener("click", closeCard);
  });

  const closeProgressMenu = () => {
    setProgressOpen(false);
  };

  const closeCompleteMenu = () => {
    setCompleteOpen(false);
  };

  const handleClick = () => {
    setSelectedHabit(habit);
    setSelectedDate(new Date());
    setOpen(true);
  };

  return (
    <div
      className={`relative dark:text-gray-200 dark:bg-neutral-800 dark:hover:bg-[rgb(45,45,45)] 
      hover:bg-[rgb(245,245,245)] flex items-center lg:pr-10 pr-8 rounded-sm dark:outline-zinc-700 select-none pl-2 py-1 w-full outline outline-1 outline-gray-200`}
      {...otherProps}
      ref={cardRef}
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
        <div className="font-bold text-sm text-zinc-500 dark:text-gray-200 flex flex-col w-fit">
          <div className="truncate max-w-[150px] mobile:max-w-[250px] sm:max-w-[350px] leading-none w-fit">
            {`${habit.habitName}`.toUpperCase()}
          </div>
          <div className="truncate leading-tight w-fit">
            {`${habit.requirement} ${habit.goal} ${habit.unit}`.toUpperCase()}
          </div>
        </div>
        <div className="text-xs font-semibold dark:text-zinc-400 text-zinc-400 h-fit leading-none w-fit">
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
              if (!getDataOfToday(habit)?.completed) {
                if (habit.goal !== 1) {
                  setProgressOpen(true);
                } else {
                  setCompleteOpen(true);
                }
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
      <CardMenu isOpen={isMenuOpen} habit={habit} completed={completed} />
    </div>
  );
};

export default HabitCard;
