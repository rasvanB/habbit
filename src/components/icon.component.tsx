import { FC } from "react";

export type IconTypes = "facebook" | "google" | "twitter";
type IconProps = {
  type: IconTypes;
};

const ProviderIcon: FC<IconProps> = ({ type }) => {
  let bgIcon: string = "";

  switch (type) {
    case "facebook":
      bgIcon = "bg-facebook-icon";
      break;
    case "google":
      bgIcon = "bg-google-icon";
      break;
    case "twitter":
      bgIcon = "bg-twitter-icon";
      break;
    default:
      break;
  }

  return (
    <div
      className={`icon h-9 ${bgIcon} bg-cover bg-center bg-no-repeat w-9`}
    ></div>
  );
};

export default ProviderIcon;
