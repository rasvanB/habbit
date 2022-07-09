import { Icon } from "@iconify/react";

type ProgressMenuProps = {
  isOpen: boolean;
};
const ProgressMenu = ({ isOpen }: ProgressMenuProps) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute top-8 right-0 flex-col bg-neutral-800 outline outline-1 dark:outline-zinc-600 rounded-md p-2 `}
    >
      <div className="whitespace-nowrap text-sm font-semibold dark:text-neutral-400 text-center">
        Enter a value
      </div>
      <div className="flex items-center justify-center">
        <button className="bg-blue-400 w-[30px] flex items-center justify-center rouded-md text-white text-lg h-[30px] font-poppins rounded-l-full">
          <Icon icon="bx:minus" />
        </button>
        <input
          type="text"
          className="h-[30px] w-[70px] dark:bg-white dark:bg-opacity-5"
        />
        <button className="bg-blue-400 flex items-center justify-center w-[30px] h-[30px] text-white text-2xl font-poppin rounded-r-full">
          <Icon icon="bi:plus" />
        </button>
      </div>
      <div className="text-center text-xs mt-1 font-semibold dark:text-neutral-400">
        Goal
      </div>
    </div>
  );
};
export default ProgressMenu;
