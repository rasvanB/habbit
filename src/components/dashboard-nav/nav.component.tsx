import { useContext, useState } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import Avatar from "./avatar.component";
import SettingsMenu from "./settings-menu.component";
import { PanelContext } from "../../context/progress-panel.context";
import { getPartOfDayFromTimeString } from "../../utils/calendar.utils";

type NavProps = {
  username: string;
  photourl: string;
};

const Nav = ({ username, photourl }: NavProps) => {
  const navigate = useNavigate();
  const { setLoading, setHabits } = useContext(UserContext);
  const { setSelectedHabit, setOpen } = useContext(PanelContext);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
    setLoading(true);
    setHabits([]);
    setSelectedHabit(null);
    setOpen(false);
    navigate("/auth/sign-in");
  };

  const toggleOpenSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  const partOfDay: string = getPartOfDayFromTimeString(new Date());

  return (
    <div className="relative flex items-center py-4 px-1 sm:px-4 xl:px-20 bg-slate-100 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-600">
      <Avatar photoUrl={photourl} onClick={toggleOpenSettings} />
      <SettingsMenu isOpen={isSettingsOpen} signOut={handleSignOut} />
      <h1 className="ml-5 font-poppins font-medium text-lg text-zinc-800 dark:text-gray-100">
        {`Good ${partOfDay}, ${username.split(" ")[0]}`}
      </h1>
    </div>
  );
};
export default Nav;
