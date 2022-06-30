import React, { useContext } from "react";
import { ModalContext } from "../../context/add-modal.context";
import { Habit, UserContext } from "../../context/user.context";
import { deleteHabitFromUser } from "../../utils/firebase/firebase.utils";
import { showToast } from "../../utils/toast/habit-toasts";
import CardMenuItem from "./card-menu-item.component";

type CardMenuProps = {
  isOpen: boolean;
  habit: Habit;
} & React.ClassAttributes<HTMLDivElement>;

const CardMenu = ({ isOpen, habit, ...otherProps }: CardMenuProps) => {
  const { currentUser, removeHabit } = useContext(UserContext);
  const { setOpen, setCurrentHabit, setHabitToEdit, setEditMode } =
    useContext(ModalContext);

  const handleRemoveHabit = (habit: Habit) => {
    if (currentUser) {
      removeHabit(habit);
      deleteHabitFromUser(currentUser.uid, habit);
      showToast("success", "Habit has been deleted successfully.");
    }
  };

  const handleClick = () => {
    setOpen(true);
    setCurrentHabit(habit);
    setHabitToEdit(habit);
    setEditMode(true);
  };

  return (
    <div
      {...otherProps}
      className={`${
        isOpen ? "top-0 opacity-100" : "-top-[1000px] opacity-0"
      } select-none flex flex-col absolute dark:bg-zinc-700 dark:text-gray-200 font-poppins text-sm -right-[140px] rounded-sm transition-opacity py-1 z-10 outline outline-1 dark:outline-zinc-500 outline-zinc-400 bg-white-100 shadow-md dark:shadow-none`}
    >
      <CardMenuItem
        text="delete"
        iconName="icon-park-outline:delete"
        onClick={() => {
          handleRemoveHabit(habit);
        }}
      />

      <CardMenuItem
        text="edit"
        iconName="akar-icons:edit"
        onClick={handleClick}
      />
      <CardMenuItem text="view progress" iconName="bx:calendar" />
    </div>
  );
};

export default CardMenu;
