import { useContext } from "react";
import { Habit, UserContext } from "../../context/user.context";
import { addHabitToUser } from "../../utils/firebase/firebase.utils";
import { getDateAsString } from "./progress-menu.component";

type MenuProps = {
  isOpen: boolean;
  habit: Habit;
  close: () => void;
};

const CompleteMenu = ({ isOpen, habit, close }: MenuProps) => {
  const { currentUser, editHabit } = useContext(UserContext);

  const handleConfirm = () => {
    if (currentUser) {
      const newHabit = { ...habit };
      newHabit.timeStamp = habit.timeStamp;
      if (newHabit.activeDays && newHabit.activeDays.length > 0) {
        if (
          newHabit.activeDays[newHabit.activeDays.length - 1].date !==
          getDateAsString()
        ) {
          newHabit.activeDays.push({
            date: getDateAsString(),
            progress: 1,
            completed: true,
          });
        }
      } else {
        newHabit.activeDays = [];
        newHabit.activeDays.push({
          date: getDateAsString(),
          progress: 1,
          completed: true,
        });
      }

      editHabit(newHabit);
      addHabitToUser(currentUser.uid, newHabit);
      close();
    }
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute top-8 right-0 flex-col dark:bg-neutral-800 bg-white outline outline-1 dark:outline-zinc-600 outline-zinc-300 rounded-md`}
    >
      <div className="whitespace-nowrap font-semibold text-sm p-2 px-4 text-neutral-700 dark:text-gray-200">
        Complete this Habit
      </div>
      <div className="flex justify-between border border-b-0 border-x-0 dark:border-neutral-700">
        <button
          className="text-center text-xs font-poppins w-full px-2 py-1 border-r-[1px] dark:border-neutral-700 text-blue-500 hover:text-blue-600"
          onClick={handleConfirm}
        >
          CONFIRM
        </button>
        <button
          className="text-center text-xs font-poppins w-full px-2 py-1 dark:text-gray-300"
          onClick={close}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default CompleteMenu;
