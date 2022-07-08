type ProgressMenuProps = {
  isOpen: boolean;
};
const ProgressMenu = ({ isOpen }: ProgressMenuProps) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute top-7 right-0 flex-col bg-neutral-800 outline outline-1 dark:outline-zinc-600 rounded-md p-2`}
    >
      <div>Test</div>
    </div>
  );
};
export default ProgressMenu;
