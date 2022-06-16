import iconNames from "../utils/icons.utils";
import { Icon } from "@iconify/react";
import { FC } from "react";
type IconMenuProps = {
  isIconsHidden: boolean;
};
const IconMenu: FC<IconMenuProps> = ({ isIconsHidden }) => {
  return (
    <div
      className={`${
        isIconsHidden ? "hidden" : "block"
      } rounded-md outline outline-1 outline-zinc-400 dark:outline-zinc-500 absolute right-14 -top-4 dark:bg-zinc-700 bg-slate-100 p-3`}
    >
      <h2 className="p-1 font-poppins text-sm dark:text-gray-300 mb-2">ICON</h2>
      <div className="gap-2 flex flex-row flex-wrap min-w-[240px] max-h-[215px] overflow-y-scroll p-1">
        {iconNames.map((iconName) => (
          <Icon
            key={iconName}
            icon={iconName}
            className="text-blue-400 w-[35px] h-[35px] cursor-pointer p-[6px] outline outline-1 outline-zinc-300 dark:outline-zinc-600 rounded-sm hover:bg-slate-200 hover:dark:bg-zinc-600 "
          />
        ))}
      </div>
    </div>
  );
};

export default IconMenu;
