type ProgressMenuProps = {
  isOpen: boolean;
};
const ProgressMenu = ({ isOpen }: ProgressMenuProps) => {
  return (
    <div className={`${isOpen ? "flex" : "hidden"} bg-red-500`}>
      Progress Menu
    </div>
  );
};
export default ProgressMenu;
