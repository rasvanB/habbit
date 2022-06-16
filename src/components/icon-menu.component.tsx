import { iconNames } from "../utils/icons.utils";
import { Icon } from "@iconify/react";
import { FC, useState } from "react";
import Button from "./button.component";
import ColorsMenu from "./colors-menu.component";
type IconMenuProps = {
  isIconsHidden: boolean;
  iconColor: string;
  selectIcon(iconName: string): void;
  changeColor(color: string): void;
};
const IconMenu: FC<IconMenuProps> = ({
  isIconsHidden,
  selectIcon,
  iconColor,
  changeColor,
}) => {
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const handleColorMenuToggle = () => {
    setIsColorMenuOpen(!isColorMenuOpen);
  };
  return (
    <div
      className={`${
        isIconsHidden ? "hidden" : ""
      } rounded-md outline outline-1 outline-zinc-400 dark:outline-zinc-500 absolute right-12 -top-5 dark:bg-zinc-700 bg-slate-100 p-3`}
    >
      <h2 className="p-1 font-poppins text-sm dark:text-gray-300 mb-2">
        <Button buttonStyle="select-color">
          <Icon
            icon="akar-icons:circle-fill"
            className={`text-2xl`}
            onClick={handleColorMenuToggle}
            style={{ color: iconColor }}
          />
        </Button>
      </h2>
      <ColorsMenu
        closeColorMenu={handleColorMenuToggle}
        isColorsMenuOpen={isColorMenuOpen}
        changeColor={changeColor}
      ></ColorsMenu>
      <div className="gap-2 flex flex-row flex-wrap min-w-[240px] max-h-[215px] overflow-y-scroll p-1">
        {iconNames.map((iconName) => (
          <Icon
            key={iconName}
            icon={iconName}
            className={`w-[35px] h-[35px] cursor-pointer p-[6px] outline outline-1 outline-zinc-300 dark:outline-zinc-600 rounded-sm hover:bg-slate-200 hover:dark:bg-zinc-600 `}
            style={{
              color: iconColor,
            }}
            onClick={() => selectIcon(iconName)}
          />
        ))}
      </div>
    </div>
  );
};

export default IconMenu;
