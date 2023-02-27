import { buttonStyles, ButtonTypes } from "../../utils/styles/button-styles";

type ButtonProps = {
  buttonStyle: ButtonTypes;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ buttonStyle, children, ...otherProps }: ButtonProps) => {
  return (
    <div>
      <button {...otherProps} className={buttonStyles({ intent: buttonStyle })}>
        {children}
      </button>
    </div>
  );
};
export default Button;
