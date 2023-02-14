import ProviderIcon from "../other/provider-icon.component";
import { IconTypes } from "../other/provider-icon.component";
import { signInWithProvider } from "../../utils/firebase/firebase.utils";

type LoginButtonProps = {
  type: IconTypes;
};

const LoginButton = ({ type }: LoginButtonProps) => {
  const handleOnClick = async () => await signInWithProvider(type);

  return (
    <div
      className="select-none transition-shadow cursor-pointer outline outline-1 rounded-md outline-zinc-200 dark:outline-zinc-700 shadow-md dark:shadow-zinc-700 p-2 hover:shadow-none"
      onClick={handleOnClick}
    >
      <ProviderIcon type={type} />
    </div>
  );
};

export default LoginButton;
