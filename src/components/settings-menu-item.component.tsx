import { Icon } from "@iconify/react";
import { FC } from "react";

type MenuItemProps = {
  iconName: string;
  text: string;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const SettingsMenuItem: FC<MenuItemProps> = ({
  iconName,
  text,
  ...otherProps
}) => {
  return (
    <div
      className="flex justify-end items-center hover:dark:bg-zinc-600 px-3 gap-2 cursor-pointer select-none"
      {...otherProps}
    >
      <h1>{text.toUpperCase()}</h1>
      <Icon icon={iconName} />
    </div>
  );
};
export default SettingsMenuItem;
