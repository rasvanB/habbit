import { useState } from "react";
import Profile from "../user-profile/profile.component";
import SettingsMenuItem from "./settings-menu-item.component";

type SettingsMenuProps = {
  isOpen: boolean;
  signOut: () => void;
};

const SettingsMenu = ({ isOpen, signOut }: SettingsMenuProps) => {
  const [profileOpen, setProfileOpen] = useState(false);

  const openProfile = () => {
    setProfileOpen(true);
  };

  const closeProfile = () => {
    setProfileOpen(false);
    console.log("wtf2");
  };

  return (
    <div
      className={`${
        isOpen ? "top-16 left-3 xl:left-auto optacity-100" : "-top-20 opacity-0"
      } flex dark:bg-zinc-700 rounded-md absolute left-[50px] flex-col font-poppins font-medium text-sm dark:text-gray-200 py-2 gap-1 bg-white shadow-md transition-opacity duration-200 ease-in`}
    >
      <SettingsMenuItem
        text="settings"
        iconName="bxs:cog"
        onClick={openProfile}
      />
      <SettingsMenuItem
        text="log out"
        iconName="ph:sign-out-bold"
        onClick={signOut}
      />
      <Profile isOpen={profileOpen} close={closeProfile} />
    </div>
  );
};
export default SettingsMenu;
