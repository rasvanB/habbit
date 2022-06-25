import { Icon } from "@iconify/react";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Habit, UserContext } from "../context/user.context";
import hexToRgba from "hex-to-rgba";
import { deleteHabitFromUser } from "../utils/firebase/firebase.utils";
import CardMenu from "./card-menu.component";

type CardProps = {
  habit: Habit;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const HabitCard: FC<CardProps> = ({ habit, ...otherProps }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<SVGSVGElement>(null);
  const { removeHabit, currentUser } = useContext(UserContext);

  const handleRemoveHabit = (habit: Habit) => {
    if (currentUser) {
      removeHabit(habit);
      deleteHabitFromUser(currentUser.uid, habit);
    }
  };

  const toggleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const closeMenu = (e: any) => {
      if (menuRef.current !== e.path[0]) {
        setMenuOpen(false);
      }
    };
    document.body.addEventListener("mousedown", closeMenu);
    return () => document.body.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div
      className="relative dark:text-gray-200 dark:bg-neutral-800  w-[450px] flex items-center pr-10 rounded-md dark:outline-zinc-600"
      {...otherProps}
      style={{
        border: `2px solid ${hexToRgba(habit.iconColor, 0.6)}`,
      }}
    >
      <div
        className="p-1 h-14 w-14 rounded-sm flex justify-center items-center"
        style={{
          backgroundColor: hexToRgba(habit.iconColor, 0.4),
        }}
      >
        <Icon
          icon={habit.iconName}
          style={{ color: habit.iconColor }}
          className="text-3xl"
        />
      </div>
      <div className="flex flex-col mx-4 my-2 ">
        <div className="font-bold text-sm text-zinc-700 dark:text-gray-200">
          {`${habit.habitName} ${habit.requirement.toLowerCase()} ${
            habit.goal
          } ${habit.unit}`.toUpperCase()}
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
          icon="bi:plus"
          className="text-2xl cursor-pointer"
          style={{ color: `${habit.iconColor}` }}
        />
      </div>
      <Icon
        icon="fluent:more-vertical-28-filled"
        className="absolute top-2 right-1 cursor-pointer"
        onClick={toggleMenuOpen}
        ref={menuRef}
      />
      <CardMenu isOpen={isMenuOpen} removeHabit={handleRemoveHabit} />
    </div>
  );
};

export default HabitCard;
