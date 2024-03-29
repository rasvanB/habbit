import { Icon } from "@iconify/react";
import { useState } from "react";

type DropdownProps = {
  options: string[];
  setRequirement: (requirement: string) => void;
  requirement: string;
};

const Dropdown = ({ options, setRequirement, requirement }: DropdownProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdownOpen = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="bg-white relative px-3 py-1 text-sm outline-zinc-200 dark:bg-zinc-600 dark:outline-zinc-500 dark:text-gray-200 outline outline-1 rounded-sm flex items-center select-none w-auto mobile:min-w-[120px] whitespace-nowrap"
      onClick={toggleDropdownOpen}
    >
      {`${requirement}`}
      <Icon
        icon={`${isDropdownOpen ? "bxs:up-arrow" : "bxs:down-arrow"}`}
        className="ml-3 mobile:ml-auto text-xs dark:text-gray-200 text-zinc-500"
      ></Icon>
      <div
        className={`${
          isDropdownOpen ? "flex" : "hidden"
        } flex-col absolute w-full top-10 dark:bg-zinc-600 bg-white dark:outline-zinc-500 outline-zinc-200 left-0 outline outline-1 z-10`}
      >
        {options.map((option) => {
          return (
            <div
              key={option}
              className="dark:hover:bg-zinc-500 hover:bg-gray-200 px-3 mobile:px-6 py-1"
              onClick={() => {
                setRequirement(option);
                toggleDropdownOpen();
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
