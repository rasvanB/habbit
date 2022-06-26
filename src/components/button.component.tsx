import { buttonStyles, buttonClasses } from "../utils/styles/button-styles";

type ButtonProps = {
  buttonStyle: buttonStyles;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ buttonStyle, children, ...otherProps }: ButtonProps) => {
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
