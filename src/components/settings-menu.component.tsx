import SettingsMenuItem from "./settings-menu-item.component";

type SettingsMenuProps = {
  isOpen: boolean;
  signOut: () => void;
};

const SettingsMenu = ({ isOpen, signOut }: SettingsMenuProps) => {
  return (
    <div
      className={`${
        isOpen ? "top-14 optacity-100" : "-top-16 opacity-0"
      } flex dark:bg-zinc-700 rounded-md absolute left-[50px] flex-col font-poppins font-medium text-sm dark:text-gray-200 py-2 gap-1 transition-opacity duration-200 ease-in`}
    >
      <SettingsMenuItem text="settings" iconName="bxs:cog" />
      <SettingsMenuItem
        text="log out"
        iconName="ph:sign-out-bold"
        onClick={signOut}
      />
    </div>
  );
};
export default SettingsMenu;
