import { iconColors } from "../utils/icons.utils";
import { Icon } from "@iconify/react";
import { FC } from "react";
type ColorMenuProps = {
  isColorsMenuOpen: boolean;
  changeColor: (color: string) => void;
  closeColorMenu: () => void;
};
const ColorsMenu: FC<ColorMenuProps> = ({
  isColorsMenuOpen,
  changeColor,
  closeColorMenu,
}) => {
  return (
    <div
      className={`${
        isColorsMenuOpen ? "flex" : "hidden"
      } flex-wrap gap-2 w-[122px] absolute dark:bg-zinc-700 outline outline-1 rounded-md p-2 dark:outline-zinc-500 bg-slate-100 outline-zinc-400`}
    >
      {iconColors.map((color) => (
        <Icon
          key={color}
          className="text-3xl cursor-pointer outline outline-1 outline-zinc-300 dark:outline-zinc-600  rounded-sm p-1 hover:dark:bg-zinc-600 hover:bg-slate-200"
          icon="akar-icons:circle-fill"
          style={{
            color: color,
          }}
          onClick={() => {
            changeColor(color);
            closeColorMenu();
          }}
        />
      ))}
    </div>
  );
};

export default ColorsMenu;
