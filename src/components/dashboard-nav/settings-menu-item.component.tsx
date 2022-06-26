import { Icon } from "@iconify/react";

type MenuItemProps = {
  iconName: string;
  text: string;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const SettingsMenuItem = ({ iconName, text, ...otherProps }: MenuItemProps) => {
  return (
    <div
      className="flex justify-end items-center hover:bg-slate-100 dark:hover:bg-zinc-600 px-3 gap-2 cursor-pointer select-none"
      {...otherProps}
    >
      <h1>{text.toUpperCase()}</h1>
      <Icon icon={iconName} />
    </div>
  );
};
export default SettingsMenuItem;
