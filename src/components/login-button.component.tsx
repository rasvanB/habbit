import { FC } from "react";
import Icon from "./icon.component";
import { IconTypes } from "./icon.component";
import { signInWithProvider } from "../utils/firebase/firebase.utils";

type LoginButtonProps = {
  type: IconTypes;
};

const LoginButton: FC<LoginButtonProps> = ({ type }) => {
  const handleOnClick = async () => {
    const error = await signInWithProvider(type);
    if (error) {
      console.log(error.code);
    } else {
      console.log("success");
    }
  };

  return (
    <div
      className="select-none transition-shadow cursor-pointer outline outline-1 rounded-md outline-zinc-200 dark:outline-zinc-700 shadow-md dark:shadow-zinc-700 p-2 first:mr-5 last:ml-5 hover:shadow-none"
      onClick={handleOnClick}
    >
      <Icon type={type} />
    </div>
  );
};

export default LoginButton;
