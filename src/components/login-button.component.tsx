import { FC } from "react";
import Icon from "./icon.component";
import { IconTypes } from "./icon.component";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
} from "../utils/firebase/firebase.utils";

type LoginButtonProps = {
  type: IconTypes;
};
const LoginButton: FC<LoginButtonProps> = ({ type }) => {
  const handleOnClick = async () => {
    switch (type) {
      case "google":
        const { user } = await signInWithGoogle();
        console.log(user);
        break;
      case "facebook":
        const { user: user2 } = await signInWithFacebook();
        console.log(user2);
        break;
      case "twitter":
        const { user: user3 } = await signInWithTwitter();
        console.log(user3);
        break;
      default:
        break;
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
