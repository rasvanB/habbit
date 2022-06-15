import { FC, useContext } from "react";
import { UserContext } from "../context/user.context";
import Icon from "./icon.component";
import { IconTypes } from "./icon.component";
import { signInWithProvider } from "../utils/firebase/firebase.utils";
import { FirebaseError } from "firebase/app";

type LoginButtonProps = {
  type: IconTypes;
};

const LoginButton: FC<LoginButtonProps> = ({ type }) => {
  const { setLoading } = useContext(UserContext);
  const handleOnClick = async () => {
    const result = await signInWithProvider(type);
    if (result instanceof FirebaseError) {
      console.log(result.code);
    } else {
      setLoading(true);
      window.location.reload();
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
