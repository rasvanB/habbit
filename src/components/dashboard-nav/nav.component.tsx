import { useState } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import Avatar from "./avatar.component";
import SettingsMenu from "./settings-menu.component";
import { getPartOfDayFromTimeString } from "../../utils/calendar.utils";
import { usePanelStore } from "../../utils/store/panel.store";
import { useUserStore } from "../../utils/store/user.store";

type NavProps = {
  username: string;
  photourl: string;
};

const Nav = ({ username, photourl }: NavProps) => {
  const navigate = useNavigate();
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const setHabits = useUserStore((state) => state.setHabits);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const setSelectedHabit = usePanelStore((state) => state.setSelectedHabit);
  const setOpen = usePanelStore((state) => state.setOpen);

  const handleSignOut = async () => {
    await signOutUser();
    setHabits([]);
    setSelectedHabit(null);
    setCurrentUser(null);
    setOpen(false);
    navigate("/auth/sign-in");
  };

  const toggleOpenSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  const partOfDay = getPartOfDayFromTimeString(new Date());
  const firstName = username.split(" ")[0];

  return (
    <div className="relative flex items-center py-4 px-2 sm:px-4 xl:px-20 bg-slate-100 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-600">
      <Avatar photoUrl={photourl} onClick={toggleOpenSettings} />
      <SettingsMenu
        isOpen={isSettingsOpen}
        signOut={handleSignOut}
        close={toggleOpenSettings}
      />
      <h1 className="ml-5 font-poppins font-medium text-lg text-zinc-800 dark:text-gray-100">
        {`Good ${partOfDay}, ${firstName}`}
      </h1>
    </div>
  );
};
export default Nav;
