import { FC } from "react";
type ButtonProps = {
  buttonStyle: string;
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button: FC<ButtonProps> = ({ buttonStyle, text }) => {
  const signupButtonStyle =
    "bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const loginButtonStyle =
    "text-blue-400 font-semibold py-2 px-4 rounded hover:text-blue-700 outline outline-2";
  const heroButtonStyle =
    "bg-blue-400 hover:bg-blue-700 text-white font-normal py-2 px-5 rounded-xl mt-5";
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
