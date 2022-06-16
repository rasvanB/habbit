import InputBox from "./form-input.component";
import Button from "./button.component";
import IonIcon from "@reacticons/ionicons";
import iconNames from "../utils/icons.utils";
import { Icon } from "@iconify/react";
import { FC, useState } from "react";
type ModalState = {
  isHidden: boolean;
  close: () => void;
};
const AddModal: FC<ModalState> = ({ isHidden, close }) => {
  const [isIconsHidden, setIsIconsHidden] = useState(true);
  const handleIconsToggle = () => {
    setIsIconsHidden(!isIconsHidden);
  };
  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      } fixed h-screen w-screen justify-center items-center bg-black bg-opacity-60`}
    >
      <div className="relative bg-slate-100 dark:bg-zinc-700 flex flex-col px-10 py-5 rounded-md">
        <IonIcon
          name="close-outline"
          className="text-2xl absolute top-2 right-3 dark:text-white cursor-pointer"
          onClick={close}
        />
        <div className="dark:text-white text-xl">Add a new Habit</div>
        <div className="flex justify-end items-end">
          <InputBox
            label="Name"
            placeholder="Enter the name of your habit"
          ></InputBox>
          <div className="relative">
            <Button
              buttonStyle="select-icon"
              className="bottom-0"
              onClick={handleIconsToggle}
            >
              <Icon icon="bi:question-lg" />
            </Button>
            <div
              className={`${
                isIconsHidden ? "hidden" : "block"
              } rounded-md outline outline-1 outline-zinc-400 dark:outline-zinc-500 absolute right-11 -top-4 dark:bg-zinc-700 bg-slate-100 p-3`}
            >
              <h2 className="p-1 font-poppins text-sm dark:text-gray-300 mb-2">
                ICON
              </h2>
              <div className="gap-2 flex flex-row flex-wrap min-w-[235px] max-h-[215px] scrollbar scrollbar-thumb-zinc-600 p-1 pr-5 ">
                {iconNames.map((icon) => (
                  <Icon
                    key={icon}
                    icon={icon}
                    className="text-blue-400 w-[35px] h-[35px] cursor-pointer p-[6px] outline outline-1 outline-zinc-300 dark:outline-zinc-600 rounded-sm hover:bg-slate-200 hover:dark:bg-zinc-600 "
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddModal;
