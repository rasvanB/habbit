import { FC } from "react";
type buttonStyles =
  | "navbar-login"
  | "navbar-signup"
  | "hero"
  | "submit"
  | "add-habit"
  | "select-icon"
  | "select-color";
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
const selectIcon =
  "dark:bg-zinc-600 bg-white outline outline-1 focus:outline-2 outline-zinc-500 dark:text-white text-zinc-800 font-semibold p-[5px] rounded whitespace-nowrap ml-5 flex items-center justify-center";
const selectColor =
  "dark:bg-zinc-600 bg-white outline outline-1 hover:outline-2 outline-zinc-500 font-semibold p-[5px] rounded whitespace-nowrap flex items-center justify-center";
const Button: FC<ButtonProps> = ({ buttonStyle, children, ...otherProps }) => {
  return (
    <div>
      <button
        {...otherProps}
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
            : buttonStyle === "select-icon"
            ? `${selectIcon}`
            : buttonStyle === "select-color"
            ? `${selectColor}`
            : ""
        }
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
