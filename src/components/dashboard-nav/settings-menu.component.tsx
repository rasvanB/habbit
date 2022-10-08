import React, { useEffect, useRef, useState } from "react";
import Profile from "../user-profile/profile.component";
import SettingsMenuItem from "./settings-menu-item.component";

type SettingsMenuProps = {
  isOpen: boolean;
  signOut: () => void;
  close: () => void;
};

const SettingsMenu = ({ isOpen, signOut, close }: SettingsMenuProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openProfile = () => {
    setProfileOpen(true);
  };

  const closeProfile = () => {
    setProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target &&
        event.target instanceof Element &&
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, isOpen, close]);

  return (
    <div
      ref={menuRef}
      className={`${
        isOpen ? "top-16 xl:left-auto optacity-100" : "-top-20 opacity-0"
      } flex dark:bg-zinc-700 rounded-md absolute left-[10px] flex-col font-poppins font-medium text-sm dark:text-gray-200 py-2 gap-1 bg-white z-10 shadow-md transition-opacity duration-200 ease-in`}
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
