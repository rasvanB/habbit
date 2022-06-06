import { FC } from "react";
type ButtonProps = {
  buttonStyle: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button: FC<ButtonProps> = ({ buttonStyle }) => {
  const navbarButtonStyle =
    "bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  return (
    <div>
      <button
        className={buttonStyle === "navbar" ? `${navbarButtonStyle}` : ""}
      >
        Log in
      </button>
    </div>
  );
};
export default Button;
