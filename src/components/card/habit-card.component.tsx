import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { Habit } from "../../context/user.context";
import hexToRgba from "hex-to-rgba";
import CardMenu from "./card-menu.component";

type CardProps = {
  habit: Habit;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const HabitCard = ({ habit, ...otherProps }: CardProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
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

  return (
    <div
      className="relative dark:text-gray-200 dark:bg-neutral-800  flex items-center lg:pr-10 pr-8 rounded-md dark:outline-zinc-600 select-none pl-1 md:pl-2 py-1 w-full lg:max-w-[600px]"
      {...otherProps}
      style={{
        border: `2px solid ${hexToRgba(habit.iconColor, 0.6)}`,
      }}
    >
      <div
        className="p-2 md:p-3 h-full w-auto rounded-md lg:rounded-lg flex items-center justify-center"
        style={{
          backgroundColor: hexToRgba(habit.iconColor, 0.4),
        }}
      >
        <Icon
          icon={habit.iconName}
          style={{ color: habit.iconColor }}
          className=" w-[25px] h-[25px] "
        />
      </div>
      <div className="flex flex-col w-full mx-3 lg:mx-4">
        <div className="font-bold text-xs lg:text-sm text-zinc-700 dark:text-gray-200 flex flex-col">
          <div className="truncate max-w-[150px] mobile:max-w-[250px] sm:max-w-[350px]">
            {`${habit.habitName}`.toUpperCase()}
          </div>
          <div className="truncate">
            {`${habit.requirement} ${habit.goal} ${habit.unit}`.toUpperCase()}
          </div>
        </div>
        <div className="text-xs font-semibold dark:text-zinc-400 text-zinc-400 h-fit">
          current: <span>{`0 / ${habit.goal}`}</span>
        </div>
      </div>
      <div
        className="ml-auto rounded-md hover:scale-110 transition-transform bg-black"
        style={{
          backgroundColor: hexToRgba(habit.iconColor, 0.2),
        }}
      >
        <Icon
          icon={habit.goal === 1 ? "eva:checkmark-outline" : "bi:plus"}
          className="text-2xl cursor-pointer"
          style={{ color: `${habit.iconColor}` }}
        />
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
