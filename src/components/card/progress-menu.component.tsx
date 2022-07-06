type ProgressMenuProps = {
  isOpen: boolean;
};
const ProgressMenu = ({ isOpen }: ProgressMenuProps) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute flex-col bg-neutral-700`}
    >
      Progress Menu
    </div>
  );
};
export default ProgressMenu;
