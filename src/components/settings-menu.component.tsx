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
        isOpen ? "flex" : "hidden"
      } dark:bg-zinc-700 rounded-md absolute top-14 left-[50px] flex-col font-poppins font-medium text-sm dark:text-gray-200 py-1 gap-1`}
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
