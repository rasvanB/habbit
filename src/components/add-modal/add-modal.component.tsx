import InputBox from "../other/input-box.component";
import Button from "../other/button.component";
import IconMenu from "../icon-menu/icon-menu.component";
import Dropdown from "../other/dropdown.component";
import Message from "../other/message.component";
import { Icon } from "@iconify/react";
import { useState, useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Habit } from "../../context/user.context";
import { validateModal } from "../../utils/modal.utils";
import { addHabitToUser } from "../../utils/firebase/firebase.utils";
import { showToast } from "../../utils/toast/habit-toasts";

type ModalProps = {
  isHidden: boolean;
  habit?: Habit;
  closeModal: () => void;
};

const requirementOptions = [
  {
    value: "At least",
    label: "At least",
  },
  {
    value: "Exactly",
    label: "Exactly",
  },
  {
    value: "Less than",
    label: "Less than",
  },
];

const defaultHabitState: Habit = {
  habitName: "",
  description: "",
  iconName: "",
  iconColor: "#5594f2",
  requirement: requirementOptions[0].value,
  unit: "",
  goal: 1,
  timeStamp: 0,
};

const AddModal = ({ isHidden, closeModal }: ModalProps) => {
  const [isIconsHidden, setIsIconsHidden] = useState(true);
  const [habitState, setHabitState] = useState(defaultHabitState);
  const [errorMessage, setErrorMessage] = useState("");
  const { addHabit, currentUser, habits } = useContext(UserContext);

  const selectIcon = (iconName: string) => {
    setHabitState({ ...habitState, iconName });
    setIsIconsHidden(true);
  };

  const handleIconsToggle = () => {
    setIsIconsHidden(!isIconsHidden);
  };

  const handleClose = () => {
    setIsIconsHidden(true);
    setErrorMessage("");
    setHabitState(defaultHabitState);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const { name, value } = e.target;
    if (name === "goal" && value) {
      if (parseInt(value) < 0) {
        setHabitState({ ...habitState, [name]: 0, timeStamp: Date.now() });
      } else if (parseInt(value) > 100) {
        setHabitState({ ...habitState, [name]: 100, timeStamp: Date.now() });
      } else {
        setHabitState({
          ...habitState,
          [name]: parseInt(value),
          timeStamp: Date.now(),
        });
      }
    } else {
      setHabitState({ ...habitState, [name]: value, timeStamp: Date.now() });
    }
  };

  const changeColor = (color: string) => {
    setHabitState({ ...habitState, iconColor: color });
  };

  const changeRequirement = (requirement: string) => {
    setHabitState({ ...habitState, requirement: requirement });
  };

  const handleClick = () => {
    const error = validateModal(habitState);
    if (error) {
      setErrorMessage(error);
    } else {
      if (habits.length < 10) {
        addHabit(habitState);
        if (currentUser) {
          addHabitToUser(currentUser.uid, habitState);
          showToast("success", "Successfully added new Habit.");
        }
        handleClose();
      } else {
        setErrorMessage("You have reached the limit of concurrent habits");
      }
    }
  };

  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      } fixed h-screen w-screen justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm dark:[color-scheme:dark] font-poppins`}
    >
      <div className="relative bg-slate-100 dark:bg-zinc-700 flex flex-col px-2 py-5 pt-10 rounded-md w-full mobile:w-auto mobile:px-10 mobile:max-w-[500px]">
        <Icon
          icon="clarity:close-line"
          className="text-2xl absolute top-2 right-3 dark:text-gray-200 cursor-pointer rounded-full outline outline-1 dark:outline-zinc-600 outline-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-500 bg-white dark:bg-zinc-600"
          onClick={handleClose}
        />
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
        <div className="dark:text-gray-200 mt-1 mb-1">GOAL</div>
        <div className="flex gap-3 mobile:gap-5">
          <Dropdown
            options={requirementOptions}
            setRequirement={changeRequirement}
            requirement={habitState.requirement}
          ></Dropdown>
          <InputBox
            name="goal"
            placeholder="goal"
            type="number"
            min={1}
            max={100}
            value={habitState.goal}
            onChange={handleChange}
          />
          <InputBox
            placeholder="unit"
            name="unit"
            onChange={handleChange}
            value={habitState.unit}
          />
        </div>
        <div className="mt-3">
          <InputBox
            placeholder="Habit description (optional)"
            name="description"
            value={habitState.description}
            onChange={handleChange}
          />
        </div>
        <Button buttonStyle="submit" onClick={handleClick}>
          <div className="font-light text-sm">Add Habit</div>
        </Button>
      </div>
    </div>
  );
};
export default AddModal;
