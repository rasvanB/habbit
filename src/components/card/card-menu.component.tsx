import React, { useState } from "react";
import {
  addHabitToUser,
  deleteHabitFromUser,
} from "../../utils/firebase/firebase.utils";
import { showToast } from "../../utils/toast/habit-toasts";
import Modal from "../other/modal.component";
import CardMenuItem from "./card-menu-item.component";
import ProgressCalendar from "../progress-calendar/progress-calendar.component";
import { getDateAsString } from "./progress-menu.component";
import { Habit } from "../../utils/types.utils";
import { useCalendarStore } from "../../utils/store/calendar.store";
import { usePanelStore } from "../../utils/store/panel.store";
import { useUserStore } from "../../utils/store/user.store";
import { useModalStore } from "../../utils/store/modal.store";

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
  const [isModalOpen, setModalOpen] = useState(false);

  const setOpen = useModalStore((state) => state.setOpen);
  const setCurrentHabit = useModalStore((state) => state.setCurrentHabit);
  const setHabitToEdit = useModalStore((state) => state.setHabitToEdit);
  const setEditMode = useModalStore((state) => state.setEditMode);

  const setSelectedHabit = usePanelStore((state) => state.setSelectedHabit);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  const currentUser = useUserStore((state) => state.currentUser);
  const removeHabit = useUserStore((state) => state.removeHabit);
  const editHabit = useUserStore((state) => state.editHabit);

  const closeModal = () => {
    if (currentUser) {
      addHabitToUser(currentUser.uid, habit);
    }
    editHabit(habit);
    setSelectedHabit(habit);
    setModalOpen(false);
  };

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
    <>
      <div
        {...otherProps}
        className={`${
          isOpen ? "top-3 lg:top-0 opacity-100" : "-top-[1000px] opacity-0"
        } select-none flex flex-col justify-center absolute dark:bg-neutral-800 dark:text-gray-200 font-poppins text-sm right-7 ${
          completed ? "lg:-right-[157px]" : "lg:-right-[140px]"
        } rounded-sm transition-opacity py-1 z-10 outline outline-1 dark:outline-zinc-500 outline-zinc-300 bg-white shadow-md dark:shadow-none`}
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
          text="log progress"
          iconName="bx:calendar"
          isMobile
          onClick={() => {
            setModalOpen(true);
            setSelectedDate(new Date());
          }}
        />
        {completed ? (
          <CardMenuItem
            text="reset completion"
            iconName="codicon:debug-restart"
            isMobile
            onClick={handleReset}
          ></CardMenuItem>
        ) : (
          <></>
        )}
      </div>
      <Modal isOpen={isModalOpen} close={closeModal}>
        <div className="text-center font-poppins mb-4 text-xl">
          LOG PROGRESS
        </div>
        <ProgressCalendar habit={habit} />
      </Modal>
    </>
  );
};

export default CardMenu;
