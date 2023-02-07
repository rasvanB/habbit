import { Icon } from "@iconify/react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
};

const Modal = ({ isOpen, children, close }: ModalProps) => {
  return isOpen ? (
    <div
      className={`flex fixed top-0 left-0 h-screen w-screen justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm dark:[color-scheme:dark] font-poppins z-50`}
    >
      <div className="relative bg-slate-100 dark:bg-zinc-700 flex flex-col px-2 py-5 pt-10 rounded-md w-full mobile:w-auto mobile:px-10 mobile:max-w-[500px]">
        <Icon
          icon="clarity:close-line"
          className="p-1 text-2xl absolute top-3 right-3 dark:text-gray-200 cursor-pointer rounded-full outline outline-1 dark:outline-zinc-600 outline-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-500 bg-white dark:bg-zinc-600"
          onClick={close}
        />
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
