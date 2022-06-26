import React, { useContext } from "react";
import { Habit, UserContext } from "../context/user.context";
import { deleteHabitFromUser } from "../utils/firebase/firebase.utils";
import CardMenuItem from "./card-menu-item.component";

type CardMenuProps = {
  isOpen: boolean;
  habit: Habit;
} & React.ClassAttributes<HTMLDivElement>;

const CardMenu = ({ isOpen, habit, ...otherProps }: CardMenuProps) => {
  const { currentUser, removeHabit } = useContext(UserContext);

  const handleRemoveHabit = (habit: Habit) => {
    if (currentUser) {
      removeHabit(habit);
      deleteHabitFromUser(currentUser.uid, habit);
    }
  };
  return (
    <div
      {...otherProps}
      className={`${
        isOpen ? "top-0 opacity-100" : "-top-[1000px] opacity-0"
      } select-none flex flex-col absolute dark:bg-zinc-700 dark:text-gray-200 font-poppins text-sm -right-[85px] rounded-sm transition-opacity py-1 z-10 outline outline-1 dark:outline-zinc-500`}
    >
      <CardMenuItem
        text="delete"
        iconName="icon-park-outline:delete"
        onClick={() => {
          handleRemoveHabit(habit);
        }}
      />
      <CardMenuItem text="edit" iconName="akar-icons:edit" />
    </div>
  );
};

export default CardMenu;
