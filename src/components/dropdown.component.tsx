import { Icon } from "@iconify/react";
import { FC, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  setRequirement: (requirement: string) => void;
  requirement: string;
};

const Dropdown: FC<DropdownProps> = ({
  options,
  setRequirement,
  requirement,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdownOpen = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="relative px-6 py-1 text-sm dark:bg-zinc-600 dark:outline-zinc-500 dark:text-gray-200 outline outline-1 rounded-sm flex items-center select-none"
      onClick={toggleDropdownOpen}
    >
      {`${requirement}`}
      <Icon
        icon={`${isDropdownOpen ? "bxs:up-arrow" : "bxs:down-arrow"}`}
        className="ml-auto text-xs"
      ></Icon>
      <div
        className={`${
          isDropdownOpen ? "flex" : "hidden"
        } flex-col absolute w-full top-7 dark:bg-zinc-600 dark:outline-zinc-500 left-0 outline outline-1`}
      >
        {options.map(({ value, label }) => {
          return (
            <div
              key={value}
              className="dark:hover:bg-zinc-500 px-6 py-1"
              onClick={() => {
                setRequirement(value);
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
