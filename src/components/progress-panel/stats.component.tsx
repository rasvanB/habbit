import { Icon } from "@iconify/react";
import {
  calculateCurrentStreak,
  calculateHighestStreak,
  calculateTotalCompletions,
} from "../../utils/stats.utils";
import { usePanelStore } from "../../utils/store/panel.store";

const Stats = () => {
  const selectedHabit = usePanelStore((state) => state.selectedHabit);
  let unit = "";

  if (selectedHabit) {
    if (selectedHabit.unit.length > 7)
      unit = selectedHabit.unit.slice(0, 7) + "...";
    else unit = selectedHabit.unit;
  }

  const highestStreak = calculateHighestStreak(selectedHabit);
  const currentStreak = calculateCurrentStreak(selectedHabit);
  const totalCompletions = calculateTotalCompletions(selectedHabit);
  return (
    <div className="flex justify-between gap-3">
      <div className="border-gray-600 dark:bg-zinc-800 bg-white shadow-sm dark:text-gray-200 p-4 rounded-lg min-w-[192px] ">
        <div className="flex justify-center items-center">
          <Icon
            icon="ant-design:fire-filled"
            className="text-2xl text-orange-400"
          />
          <div className="ml-2 font-semibold text-xl">{`${highestStreak} ${
            highestStreak !== 1 ? "DAYS" : "DAY"
          }`}</div>
        </div>
        <div className=" font-semibold text-xs text-center mt-1">
          LONGEST STREAK
        </div>
      </div>
      <div className="border-gray-600 dark:bg-zinc-800 bg-white shadow-sm dark:text-gray-200 p-4 rounded-lg min-w-[192px]">
        <div className="flex justify-center items-center">
          <Icon
            icon="ant-design:fire-filled"
            className="text-2xl text-blue-300"
          />
          <div className="ml-2 font-semibold text-xl">{`${currentStreak} ${
            currentStreak !== 1 ? "DAYS" : "DAY"
          }`}</div>
        </div>
        <div className="font-semibold text-xs text-center mt-1">
          CURRENT STREAK
        </div>
      </div>
      <div className="border-gray-600  dark:bg-zinc-800 bg-white shadow-sm dark:text-gray-200 p-4 rounded-lg min-w-[192px] ">
        <div className="flex justify-center items-center">
          <Icon
            icon="akar-icons:circle-check-fill"
            className="text-2xl text-green-500"
          />
          <div className="ml-2 font-semibold text-xl">{`${totalCompletions} ${unit}`}</div>
        </div>
        <div className=" font-semibold text-xs text-center mt-1">
          TOTAL PROGRESS
        </div>
      </div>
    </div>
  );
};

export default Stats;
