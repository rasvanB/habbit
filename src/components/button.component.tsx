import { FC } from "react";
import { buttonStyles, buttonClasses } from "../utils/styles/button-styles";

type ButtonProps = {
  buttonStyle: buttonStyles;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ buttonStyle, children, ...otherProps }) => {
  return (
    <div>
      <button
        {...otherProps}
        className={
          buttonStyle === "navbar-signup"
            ? `${buttonClasses.signupButtonStyle}`
            : buttonStyle === "navbar-login"
            ? `${buttonClasses.loginButtonStyle}`
            : buttonStyle === "hero"
            ? `${buttonClasses.heroButtonStyle}`
            : buttonStyle === "submit"
            ? `${buttonClasses.submitButton}`
            : buttonStyle === "add-habit"
            ? `${buttonClasses.addHabitButton}`
            : buttonStyle === "select-icon"
            ? `${buttonClasses.selectIcon}`
            : buttonStyle === "select-color"
            ? `${buttonClasses.selectColor}`
            : ""
        }
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
