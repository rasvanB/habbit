import InputBox from "./form-input.component";
import Button from "./button.component";
import IonIcon from "@reacticons/ionicons";
import iconNames from "../utils/icons.utils";
import { Icon } from "@iconify/react";
import { FC } from "react";
type ModalState = {
  isHidden: boolean;
  close: () => void;
};
const AddModal: FC<ModalState> = ({ isHidden, close }) => {
  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      } fixed h-screen w-screen justify-center items-center bg-black bg-opacity-60`}
    >
      <div className="relative bg-slate-200 dark:bg-zinc-700 flex flex-col px-10 py-5 rounded-md">
        <IonIcon
          name="close-outline"
          className="text-2xl absolute top-2 right-3 text-white cursor-pointer"
          onClick={close}
        />
        <div className="dark:text-white text-xl">Add a new Habit</div>
        <div className="flex justify-end items-end">
          <InputBox
            label="Name"
            placeholder="Enter the name of your habit"
          ></InputBox>
          <div className="relative">
            <Button buttonStyle="select-icon" className="bottom-0">
              <Icon icon="bi:x" className="" />
            </Button>
            <div className="absolute top-9 bg-zinc-700">
              <div className="gap-2 flex flex-row flex-wrap min-w-[145px] p-3">
                {iconNames.map((icon) => (
                  <Icon
                    key={icon}
                    icon={icon}
                    className="text-white w-[35px] h-[35px] cursor-pointer p-1 outline outline-1 outline-zinc-500"
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
