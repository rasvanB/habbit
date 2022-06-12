import { FC } from "react";
import Icon from "./icon.component";
import { IconTypes } from "./icon.component";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  UserInfo,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";
type LoginButtonProps = {
  type: IconTypes;
};

const setUserInfo = (user: User, userInfo: UserInfo) => {
  if (user && user.email && user.displayName && user.photoURL && user.uid) {
    userInfo.displayName = user.displayName;
    userInfo.email = user.email;
    userInfo.photoURL = user.photoURL;
    userInfo.uid = user.uid;
  }
};

const LoginButton: FC<LoginButtonProps> = ({ type }) => {
  const userInfo: UserInfo = {
    email: "",
    displayName: "",
    photoURL: "",
    uid: "",
  };
  const handleOnClick = async () => {
    switch (type) {
      case "google":
        const { user } = await signInWithGoogle();
        setUserInfo(user, userInfo);
        createUserDocumentFromAuth(userInfo);
        break;
      case "facebook":
        const { user: user2 } = await signInWithFacebook();
        setUserInfo(user2, userInfo);
        createUserDocumentFromAuth(userInfo);
        break;
      case "twitter":
        const { user: user3 } = await signInWithTwitter();
        setUserInfo(user3, userInfo);
        createUserDocumentFromAuth(userInfo);
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
