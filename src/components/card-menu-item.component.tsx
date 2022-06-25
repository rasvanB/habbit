import { Icon } from "@iconify/react";
import React from "react";

const CardMenuItem = ({
  text,
  iconName,
  ...otherProps
}: {
  text: string;
  iconName: string;
} & React.BaseHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="px-2 hover:bg-zinc-600" {...otherProps}>
      <Icon icon={iconName} className="inline align-middle mr-2" />
      <span className="align-middle text-xs ">{text.toUpperCase()}</span>
    </div>
  );
};

export default CardMenuItem;
