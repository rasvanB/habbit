import { FC } from "react";
type buttonStyles =
  | "navbar-login"
  | "navbar-signup"
  | "hero"
  | "submit"
  | "add-habit";
type ButtonProps = {
  buttonStyle: buttonStyles;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const signupButtonStyle =
  "bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap";
const loginButtonStyle =
  "text-blue-400 font-semibold py-2 px-4 rounded hover:text-blue-600 outline outline-2 whitespace-nowrap";
const heroButtonStyle =
  "bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-5 rounded-xl mt-5 whitespace-nowrap";
const submitButton =
  "bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold py-2 px-4 rounded whitespace-nowrap mt-5";
const addHabitButton =
  "bg-blue-500 hover:bg-blue-600 min-w-[150px] text-white font-semibold py-2 px-4 rounded whitespace-nowrap mt-5";

const Button: FC<ButtonProps> = ({ buttonStyle, children }) => {
  return (
    <div>
      <button
        className={
          buttonStyle === "navbar-signup"
            ? `${signupButtonStyle}`
            : buttonStyle === "navbar-login"
            ? `${loginButtonStyle}`
            : buttonStyle === "hero"
            ? `${heroButtonStyle}`
            : buttonStyle === "submit"
            ? `${submitButton}`
            : buttonStyle === "add-habit"
            ? `${addHabitButton}`
            : ""
        }
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
