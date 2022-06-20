import InputBox from "./input-box.component";
import Button from "./button.component";
import IonIcon from "@reacticons/ionicons";
import IconMenu from "./icon-menu.component";
import { Icon } from "@iconify/react";
import { FC, useState } from "react";
import Dropdown from "./dropdown.component";

type ModalProps = {
  isHidden: boolean;
  closeModal: () => void;
};

const defaultHabitState = {
  habitName: "",
  habitDescription: "",
  iconName: "",
  iconColor: "#5594f2",
};

const requirementOptions = [
  { value: "At least", label: "At least" },
  {
    value: "Exactly",
    label: "Exactly",
  },
  {
    value: "Less than",
    label: "Less than",
  },
];

const AddModal: FC<ModalProps> = ({ isHidden, closeModal }) => {
  const [isIconsHidden, setIsIconsHidden] = useState(true);
  const [habitState, setHabitState] = useState(defaultHabitState);
  const [requirement, setRequirement] = useState(requirementOptions[0].value);

  const selectIcon = (iconName: string) => {
    setHabitState({ ...habitState, iconName });
    setIsIconsHidden(true);
  };

  const handleIconsToggle = () => {
    setIsIconsHidden(!isIconsHidden);
  };

  const handleClose = () => {
    setIsIconsHidden(true);
    setHabitState(defaultHabitState);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setHabitState({ ...habitState, habitName: value });
  };

  const changeColor = (color: string) => {
    setHabitState({ ...habitState, iconColor: color });
  };

  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      } fixed h-screen w-screen justify-center items-center bg-black bg-opacity-60 dark:[color-scheme:dark] font-poppins`}
    >
      <div className="relative bg-slate-100 dark:bg-zinc-700 flex flex-col px-2 py-5 rounded-md w-full mobile:w-auto mobile:px-10 mobile:max-w-[500px]">
        <IonIcon
          name="close-outline"
          className="text-2xl absolute top-2 right-3 dark:text-gray-200 cursor-pointer"
          onClick={handleClose}
        />
        <div className="dark:text-gray-200 text-xl">Add a new Habit</div>
        <div className="flex items-end">
          <InputBox
            label="NAME"
            onChange={handleChange}
            value={habitState.habitName}
            placeholder="Name your habit"
          ></InputBox>
          <div className="ml-auto relative">
            <h1 className="dark:text-gray-200 ml-[19px] mb-1 text-sm">ICON</h1>
            <Button
              buttonStyle="select-icon"
              className="bottom-0"
              onClick={handleIconsToggle}
            >
              <div className="w-[25px] h-[25px] flex justify-center items-center">
                <Icon
                  icon={`${
                    habitState.iconName ? habitState.iconName : "bi:question-lg"
                  }`}
                  className={`text-2xl`}
                  style={{
                    color: habitState.iconColor,
                  }}
                />
              </div>
            </Button>
            <IconMenu
              isIconsHidden={isIconsHidden}
              selectIcon={selectIcon}
              iconColor={habitState.iconColor}
              changeColor={changeColor}
            />
          </div>
        </div>
        <div className="mt-3 flex gap-5">
          <Dropdown
            options={requirementOptions}
            setRequirement={setRequirement}
            requirement={requirement}
          ></Dropdown>
          <InputBox placeholder="frequency" type="number" />
          <InputBox placeholder="unit" />
        </div>
      </div>
    </div>
  );
};
export default AddModal;
