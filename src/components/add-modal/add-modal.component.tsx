import InputBox from "../other/input-box.component";
import Button from "../other/button.component";
import IconMenu from "../icon-menu/icon-menu.component";
import Dropdown from "../other/dropdown.component";
import Message from "../other/message.component";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { validateModal } from "../../utils/modal.utils";
import { addHabitToUser } from "../../utils/firebase/firebase.utils";
import { showToast } from "../../utils/toast/habit-toasts";
import { getDateAsString } from "../card/progress-menu.component";
import Modal from "../other/modal.component";
import { usePanelStore } from "../../utils/store/panel.store";
import { useUserStore } from "../../utils/store/user.store";
import {
  defaultHabitState,
  requirementOptions,
  useModalStore,
} from "../../utils/store/modal.store";

const AddModal = () => {
  const [isIconsHidden, setIsIconsHidden] = useState(true);

  const isOpen = useModalStore((state) => state.isOpen);
  const setOpen = useModalStore((state) => state.setOpen);
  const currentHabit = useModalStore((state) => state.currentHabit);
  const setCurrentHabit = useModalStore((state) => state.setCurrentHabit);
  const editMode = useModalStore((state) => state.editMode);
  const errorMessage = useModalStore((state) => state.errorMessage);
  const setErrorMessage = useModalStore((state) => state.setErrorMessage);
  const habitToEdit = useModalStore((state) => state.habitToEdit);

  const addHabit = useUserStore((state) => state.addHabit);
  const currentUser = useUserStore((state) => state.currentUser);
  const habits = useUserStore((state) => state.habits);
  const editHabit = useUserStore((state) => state.editHabit);

  const selectedHabit = usePanelStore((state) => state.selectedHabit);
  const setSelectedHabit = usePanelStore((state) => state.setSelectedHabit);

  const closeModal = () => {
    setOpen(!isOpen);
  };

  const selectIcon = (iconName: string) => {
    setCurrentHabit({ ...currentHabit, iconName });
    setIsIconsHidden(true);
  };

  const handleIconsToggle = () => {
    setIsIconsHidden(!isIconsHidden);
  };

  const handleClose = () => {
    setIsIconsHidden(true);
    setErrorMessage("");
    setCurrentHabit(defaultHabitState);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const { name, value } = e.target;
    if (name === "goal" && value) {
      if (parseInt(value) < 0) {
        setCurrentHabit({ ...currentHabit, [name]: 0, timeStamp: Date.now() });
      } else if (parseInt(value) > 300) {
        setCurrentHabit({
          ...currentHabit,
          [name]: 300,
          timeStamp: Date.now(),
        });
      } else {
        setCurrentHabit({
          ...currentHabit,
          [name]: parseInt(value),
          timeStamp: Date.now(),
        });
      }
    } else {
      setCurrentHabit({
        ...currentHabit,
        [name]: value,
        timeStamp: Date.now(),
      });
    }
  };

  const changeColor = (color: string) => {
    setCurrentHabit({ ...currentHabit, iconColor: color });
  };

  const changeRequirement = (requirement: string) => {
    setCurrentHabit({ ...currentHabit, requirement: requirement });
  };

  const handleAdd = () => {
    const error = validateModal(currentHabit);
    if (error) setErrorMessage(error);
    else {
      if (habits.length < 8) {
        addHabit(currentHabit);
        if (currentUser) {
          addHabitToUser(currentUser.uid, currentHabit);
          showToast("success", "Habit has been added.");
        }
        handleClose();
      } else {
        setErrorMessage("You have reached the limit of concurrent habits");
      }
    }
  };

  const handleEdit = () => {
    const error = validateModal(currentHabit);
    if (error) setErrorMessage(error);
    else {
      if (currentUser) {
        const newHabit = { ...currentHabit, timeStamp: habitToEdit.timeStamp };
        if (
          newHabit.goal !== habitToEdit.goal &&
          newHabit.activeDays &&
          newHabit.activeDays.length > 0 &&
          newHabit.activeDays[newHabit.activeDays.length - 1].date ===
            getDateAsString()
        ) {
          const progress =
            newHabit.activeDays[newHabit.activeDays.length - 1].progress;

          newHabit.activeDays[newHabit.activeDays.length - 1].progress;
          newHabit.activeDays[newHabit.activeDays.length - 1] = {
            completed: progress >= newHabit.goal,
            date: getDateAsString(),
            progress: progress,
          };
        }
        editHabit(newHabit);
        addHabitToUser(currentUser.uid, newHabit);
        if (selectedHabit) {
          setSelectedHabit(newHabit);
        }
        showToast("success", "Habit has been edited.");
        handleClose();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} close={handleClose}>
      {errorMessage && (
        <div className="my-3">
          <Message isError message={errorMessage} />
        </div>
      )}
      <div className="flex items-end">
        <InputBox
          label="NAME"
          name="habitName"
          onChange={handleChange}
          value={currentHabit.habitName}
          placeholder="Name your habit"
        ></InputBox>
        <div className="ml-auto relative">
          <h1 className="dark:text-gray-200 ml-[19px] mb-1 text-sm">ICON</h1>
          <Button
            buttonStyle="select-icon"
            className="bottom-0"
            onClick={handleIconsToggle}
          >
            <div className="mobile:w-[25px] mobile:h-[25px] flex justify-center items-center">
              <Icon
                icon={`${
                  currentHabit.iconName
                    ? currentHabit.iconName
                    : "bi:question-lg"
                }`}
                className={`text-2xl`}
                style={{
                  color: currentHabit.iconColor,
                }}
              />
            </div>
          </Button>
          <IconMenu
            isIconsHidden={isIconsHidden}
            selectIcon={selectIcon}
            iconColor={currentHabit.iconColor}
            changeColor={changeColor}
          />
        </div>
      </div>
      <div className="dark:text-gray-200 mt-1 mb-1">GOAL</div>
      <div className="flex gap-3 mobile:gap-5">
        <Dropdown
          options={requirementOptions}
          setRequirement={changeRequirement}
          requirement={currentHabit.requirement}
        ></Dropdown>
        <InputBox
          name="goal"
          placeholder="goal"
          type="number"
          min={1}
          max={300}
          value={currentHabit.goal}
          onChange={handleChange}
        />
        <InputBox
          placeholder="unit"
          name="unit"
          onChange={handleChange}
          value={currentHabit.unit}
        />
      </div>
      <div className="mt-3">
        <InputBox
          placeholder="Habit description (optional)"
          name="description"
          value={currentHabit.description}
          onChange={handleChange}
        />
      </div>
      <Button buttonStyle="submit" onClick={editMode ? handleEdit : handleAdd}>
        <div className="font-light text-sm">{`${
          editMode ? "Edit Habit" : "Add Habit"
        }`}</div>
      </Button>
    </Modal>
  );
};
export default AddModal;
