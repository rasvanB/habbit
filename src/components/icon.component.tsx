import FacebookIcon from "../assets/facebook.png";
import GoogleIcon from "../assets/google.png";
import AppleIcon from "../assets/apple.png";
import AppleIconLight from "../assets/apple-light.png";
import { ThemeContext } from "../context/theme.context";
import { FC, useContext } from "react";

export type IconTypes = "facebook" | "google" | "apple";
type IconProps = {
  type: IconTypes;
};

const Icon: FC<IconProps> = ({ type }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className="icon">
      {type === "facebook" ? (
        <img src={FacebookIcon} alt="facebook" className="h-12" />
      ) : type === "google" ? (
        <img src={GoogleIcon} alt="google" className="h-12" />
      ) : type === "apple" ? (
        darkMode ? (
          <img src={AppleIcon} alt="apple" className="h-12" />
        ) : (
          <img src={AppleIconLight} alt="apple" className="h-12" />
        )
      ) : null}
    </div>
  );
};

export default Icon;
