import FacebookIcon from "../assets/facebook.png";
import GoogleIcon from "../assets/google.png";
import AppleIcon from "../assets/apple.png";
import { FC } from "react";

export type IconTypes = "facebook" | "google" | "apple";
type IconProps = {
  type: IconTypes;
};

const Icon: FC<IconProps> = ({ type }) => {
  return (
    <div className="icon">
      {type === "facebook" && (
        <img src={FacebookIcon} alt="Facebook" className="h-12" />
      )}
      {type === "google" && (
        <img src={GoogleIcon} alt="Google" className="h-12" />
      )}
      {type === "apple" && <img src={AppleIcon} alt="Apple" className="h-12" />}
    </div>
  );
};

export default Icon;
