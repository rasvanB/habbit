import InputBox from "./form-input.component";
import Button from "./button.component";
import IonIcon from "@reacticons/ionicons";
import IconMenu from "./icon-menu.component";
import { Icon } from "@iconify/react";
import { FC, useState } from "react";
type ModalState = {
  isHidden: boolean;
  closeModal: () => void;
};
const AddModal: FC<ModalState> = ({ isHidden, closeModal }) => {
  const [isIconsHidden, setIsIconsHidden] = useState(true);
  const handleIconsToggle = () => {
    setIsIconsHidden(!isIconsHidden);
  };
  const handleClose = () => {
    setIsIconsHidden(true);
    closeModal();
  };
  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      } fixed h-screen w-screen justify-center items-center bg-black bg-opacity-60 dark:[color-scheme:dark] font-poppins`}
    >
      <div className="relative bg-slate-100 dark:bg-zinc-700 flex flex-col px-10 py-5 rounded-md">
        <IonIcon
          name="close-outline"
          className="text-2xl absolute top-2 right-3 dark:text-gray-200 cursor-pointer"
          onClick={handleClose}
        />
        <div className="dark:text-gray-200 text-xl">Add a new Habit</div>
        <div className="flex justify-end items-end">
          <InputBox
            label="NAME"
            placeholder="Enter the name of your habit"
          ></InputBox>
          <div className="relative">
            <h1 className="dark:text-gray-200 ml-[19px] mb-1 text-sm">ICON</h1>
            <Button
              buttonStyle="select-icon"
              className="bottom-0"
              onClick={handleIconsToggle}
            >
              <Icon icon="bi:question-lg" className="text-xl m-1" />
            </Button>
            <IconMenu isIconsHidden={isIconsHidden} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddModal;
