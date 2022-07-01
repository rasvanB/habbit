import { useContext, useState } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import Avatar from "./avatar.component";
import SettingsMenu from "./settings-menu.component";

type NavProps = {
  username: string;
  photourl: string;
};

const Nav = ({ username, photourl }: NavProps) => {
  const navigate = useNavigate();
  const { setLoading, setHabits } = useContext(UserContext);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
    setLoading(true);
    setHabits([]);
    navigate("/auth/sign-in");
  };

  const toggleOpenSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="relative flex items-center py-4 px-1 sm:px-4 xl:px-20 bg-slate-100 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-600">
      <Avatar photoUrl={photourl} onClick={toggleOpenSettings} />
      <SettingsMenu isOpen={isSettingsOpen} signOut={handleSignOut} />
      <h1 className="ml-3 font-poppins font-medium text-zinc-800 dark:text-gray-100">
        {`${username.split(" ")[0]}`}
      </h1>
    </div>
  );
};
export default Nav;
