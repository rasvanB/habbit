type ProgressMenuProps = {
  isOpen: boolean;
};
const ProgressMenu = ({ isOpen }: ProgressMenuProps) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute top-8 right-0 flex-col bg-neutral-800 outline outline-1 dark:outline-zinc-600 rounded-md p-2 `}
    >
      <div className="whitespace-nowrap text-sm font-semibold dark:text-neutral-400 text-center">
        Enter a value
      </div>
      <div className="flex">
        <button className="bg-blue-400 w-[40px] rouded-md text-white text-4xl font-poppins font-thin text-center">
          -
        </button>
        <input type="text" className="" />
        <button className="bg-blue-400 w-[40px] text-white text-3xl font-poppins">
          +
        </button>
      </div>
    </div>
  );
};
export default ProgressMenu;
