import Icon from "./icon.component";
import { IconTypes } from "./icon.component";

const LoginButton = ({ type }: { type: IconTypes }) => {
  const handleOnClick = () => {
    console.log(`${type} button clicked`);
  };
  return (
    <div
      className="select-none cursor-pointer outline outline-1 rounded-md p-1 outline-zinc-200 dark:outline-zinc-700 shadow-md shadow-zinc-700"
      onClick={handleOnClick}
    >
      <Icon type={type} />
    </div>
  );
};
export default LoginButton;
