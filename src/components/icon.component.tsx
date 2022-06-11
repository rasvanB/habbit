import { FC } from "react";

export type IconTypes = "facebook" | "google" | "apple";
type IconProps = {
  type: IconTypes;
};

const Icon: FC<IconProps> = ({ type }) => {
  let bgIcon: string = "";

  switch (type) {
    case "facebook":
      bgIcon = "bg-facebook-icon";
      break;
    case "google":
      bgIcon = "bg-google-icon";
      break;
    case "apple":
      bgIcon = "bg-apple-icon dark:bg-apple-light-icon";
      break;
    default:
      break;
  }

  return (
    <div
      className={`icon h-12 ${bgIcon} bg-cover bg-center bg-no-repeat w-12`}
    ></div>
  );
};

export default Icon;
