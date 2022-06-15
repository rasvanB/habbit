import InputBox from "./form-input.component";
import Button from "./button.component";
import IonIcon from "@reacticons/ionicons";
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
          <Button buttonStyle="select-icon" className="bottom-0">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddModal;
