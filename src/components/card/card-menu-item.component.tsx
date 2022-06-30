import { Icon } from "@iconify/react";
import React from "react";

type MenuItemProps = {
  text: string;
  iconName: string;
  isMobile: boolean;
} & React.BaseHTMLAttributes<HTMLDivElement>;

const CardMenuItem = ({
  text,
  iconName,
  isMobile,
  ...otherProps
}: MenuItemProps) => {
  return (
    <div
      className={`${
        isMobile ? "block" : "hidden lg:block"
      } px-2 hover:dark:bg-zinc-600 hover:bg-slate-100 cursor-pointer `}
      {...otherProps}
    >
      <Icon icon={iconName} className="inline align-middle mr-2" />
      <span className="align-middle text-xs ">{text.toUpperCase()}</span>
    </div>
  );
};

export default CardMenuItem;
