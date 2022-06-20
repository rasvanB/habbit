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

const defaultHabitState = {
  name: "",
  description: "",
  iconName: "",
  iconColor: "#5594f2",
  requirement: requirementOptions[0].value,
  unit: "",
  frequency: 1,
};

const AddModal: FC<ModalProps> = ({ isHidden, closeModal }) => {
  const [isIconsHidden, setIsIconsHidden] = useState(true);
  const [habitState, setHabitState] = useState(defaultHabitState);
  console.log(habitState);

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
    const { name, value } = e.target;
    setHabitState({ ...habitState, [name]: value });
  };

  const changeColor = (color: string) => {
    setHabitState({ ...habitState, iconColor: color });
  };

  const changeRequirement = (requirement: string) => {
    setHabitState({ ...habitState, requirement: requirement });
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
            name="name"
            onChange={handleChange}
            value={habitState.name}
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
        <div className="mt-3 flex gap-3 mobile:gap-5">
          <Dropdown
            options={requirementOptions}
            setRequirement={changeRequirement}
            requirement={habitState.requirement}
          ></Dropdown>
          <InputBox
            name="frequency"
            placeholder="frequency"
            type="number"
            onChange={handleChange}
          />
          <InputBox placeholder="unit" name="unit" onChange={handleChange} />
        </div>
        <div className="mt-3">
          <InputBox
            placeholder="Habit description (optional)"
            name="description"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
export default AddModal;
