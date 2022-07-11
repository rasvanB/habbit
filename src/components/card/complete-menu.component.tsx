import { Habit } from "../../context/user.context";

type MenuProps = {
  isOpen: boolean;
  habit: Habit;
};

const CompleteMenu = ({ isOpen }: MenuProps) => {
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute top-8 right-0 flex-col bg-neutral-800 outline outline-1 dark:outline-zinc-600 rounded-md `}
    >
      Complete Menu
    </div>
  );
};

export default CompleteMenu;
