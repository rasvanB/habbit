import { FC } from "react";
type ButtonProps = {
  buttonStyle: string;
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button: FC<ButtonProps> = ({ buttonStyle, text }) => {
  const signupButtonStyle =
    "bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap";
  const loginButtonStyle =
    "text-blue-400 font-semibold py-2 px-4 rounded hover:text-blue-600 outline outline-2 whitespace-nowrap";
  const heroButtonStyle =
    "bg-blue-400 hover:bg-blue-600 text-white font-normal py-2 px-5 rounded-xl mt-5 whitespace-nowrap";
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
            : ""
        }
      >
        {`${text}`}
      </button>
    </div>
  );
};
export default Button;
