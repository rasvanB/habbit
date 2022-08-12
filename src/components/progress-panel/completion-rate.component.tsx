import { ResponsivePie } from "@nivo/pie";
import { useCallback, useContext, useEffect, useState } from "react";
import { PanelContext } from "../../context/progress-panel.context";

const CompletionRate = () => {
  const [mode, setMode] = useState("");
  const { selectedHabit } = useContext(PanelContext);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        setMode(colorScheme);
      });
    setMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  const getNumberOfCompletedDays = useCallback(() => {
    if (selectedHabit) {
      if (selectedHabit.activeDays) {
        return selectedHabit?.activeDays.filter((day) => day.completed).length;
      }
      return 0;
    }
    return 0;
  }, [selectedHabit]);

  const getNumberOfDays = useCallback(() => {
    let firstDay = null;
    if (selectedHabit) {
      if (selectedHabit.activeDays) {
        firstDay = selectedHabit.activeDays[0];
      }
    }
    if (firstDay) {
      const firstDayAsDate = new Date(firstDay.date);
      const todayDate = new Date();
      todayDate.setUTCHours(0, 0, 0);
      const result = Math.round(
        (todayDate.getTime() - firstDayAsDate.getTime()) / (1000 * 3600 * 24)
      );
      if (result === -1) return 1;
      else return result;
    } else return 0;
  }, [selectedHabit]);

  const numberOfCompletedDays = getNumberOfCompletedDays();
  const numberOfDays = getNumberOfDays();

  let completedRate = "0";
  if (numberOfDays) {
    completedRate = ((100 * numberOfCompletedDays) / numberOfDays).toFixed(1);
  }

  return (
    <div className="w-[240px] h-[312px] dark:bg-zinc-800 bg-white shadow-sm dark:text-gray-200 rounded-lg mt-3 font-poppins p-2 relative ml-2">
      <div className="text-center font-medium mt-2">Completion Rate</div>
      <div className="w-[220px] h-[252px] relative mt-1">
        <div className="absolute flex justify-center items-center text-xl dark:text-gray-200 text-neutral-700 font-medium font-poppins text-center top-0 left-0 w-full h-full">
          {completedRate !== "NaN" ? completedRate : 0}%
        </div>
        <ResponsivePie
          data={[
            {
              id: 0,
              value: completedRate !== "NaN" ? parseFloat(completedRate) : 0,
              color: "#3B82F6",
            },
            {
              id: 1,
              value:
                completedRate !== "NaN" ? 100 - parseFloat(completedRate) : 100,
              color: mode === "dark" ? "#363636" : "#e7e7e7",
            },
          ]}
          innerRadius={0.5}
          cornerRadius={3}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          activeOuterRadiusOffset={5}
          colors={{ datum: "data.color" }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          tooltip={() => <></>}
        ></ResponsivePie>
      </div>
    </div>
  );
};

export default CompletionRate;
