import { FC } from "react";
import SettingsMenuItem from "./settings-menu-item.component";

type SettingsMenuProps = {
  isOpen: boolean;
  signOut: () => void;
};

const SettingsMenu: FC<SettingsMenuProps> = ({ isOpen, signOut }) => {
  return (
    <div
      className={`${
        isOpen ? "top-14 optacity-100" : "-top-14 opacity-0"
      } flex dark:bg-zinc-700 rounded-md absolute left-[50px] flex-col font-poppins font-medium text-sm dark:text-gray-200 py-1 gap-1 transition-opacity duration-200 ease-in`}
    >
      <SettingsMenuItem text="settings" iconName="bxs:cog" />
      <SettingsMenuItem
        text="log out"
        iconName="octicon:sign-out-16"
        onClick={signOut}
      />
    </div>
  );
};
export default SettingsMenu;
