import Icon from "./icon.component";
import { IconTypes } from "./icon.component";

const LoginButton = ({ type }: { type: IconTypes }) => {
  const handleOnClick = () => {
    console.log("Login Button Clicked");
  };
  return (
    <div
      className="cursor-pointer outline outline-1 rounded-md p-1 outline-zinc-200 shadow-md"
      onClick={handleOnClick}
    >
      <Icon type={type} />
    </div>
  );
};
export default LoginButton;
