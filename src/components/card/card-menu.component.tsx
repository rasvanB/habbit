import React, { useContext } from "react";
import { ModalContext } from "../../context/add-modal.context";
import { PanelContext } from "../../context/progress-panel.context";
import { Habit, UserContext } from "../../context/user.context";
import {
  addHabitToUser,
  deleteHabitFromUser,
} from "../../utils/firebase/firebase.utils";
import { showToast } from "../../utils/toast/habit-toasts";
import CardMenuItem from "./card-menu-item.component";
import { getDateAsString } from "./progress-menu.component";

type CardMenuProps = {
  isOpen: boolean;
  habit: Habit;
  completed: boolean;
} & React.ClassAttributes<HTMLDivElement>;

const CardMenu = ({
  isOpen,
  habit,
  completed,
  ...otherProps
}: CardMenuProps) => {
  const { currentUser, removeHabit, editHabit } = useContext(UserContext);
  const { setSelectedHabit } = useContext(PanelContext);
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

  const handleReset = () => {
    if (currentUser) {
      const newHabit = { ...habit };
      newHabit.timeStamp = habit.timeStamp;
      if (newHabit.activeDays && newHabit.activeDays.length > 0) {
        newHabit.activeDays.pop();
        newHabit.activeDays.push({
          completed: false,
          date: getDateAsString(),
          progress: 0,
        });
        editHabit(newHabit);
        addHabitToUser(currentUser.uid, newHabit);
        showToast("success", "Progress has been reset!");
        setSelectedHabit(newHabit);
      }
    }
  };

  return (
    <div
      {...otherProps}
      className={`${
        isOpen ? "top-3 lg:top-0 opacity-100" : "-top-[1000px] opacity-0"
      } select-none flex flex-col absolute dark:bg-neutral-800 dark:text-gray-200 font-poppins text-sm right-7 lg:-right-[140px] rounded-sm transition-opacity py-1 z-10 outline outline-1 dark:outline-zinc-500 outline-zinc-300 bg-white shadow-md dark:shadow-none`}
    >
      <CardMenuItem
        text="delete"
        iconName="icon-park-outline:delete"
        onClick={() => {
          handleRemoveHabit(habit);
        }}
        isMobile
      />
      <CardMenuItem
        text="edit"
        iconName="akar-icons:edit"
        onClick={handleClick}
        isMobile
      />
      <CardMenuItem
        text="view progress"
        iconName="bx:calendar"
        isMobile={false}
      />
      {completed ? (
        <CardMenuItem
          text="reset progress"
          iconName="codicon:debug-restart"
          isMobile
          onClick={handleReset}
        ></CardMenuItem>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardMenu;
