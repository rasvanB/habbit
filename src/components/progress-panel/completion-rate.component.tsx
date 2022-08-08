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
      return (
        (todayDate.getTime() - firstDayAsDate.getTime()) / (1000 * 3600 * 24)
      );
    } else return 0;
  }, [selectedHabit]);

  const numberOfCompletedDays = getNumberOfCompletedDays();
  const numberOfDays = getNumberOfDays().toFixed(1);
  const completedRate = (
    parseFloat(numberOfDays) / numberOfCompletedDays
  ).toFixed(1);

  return (
    <div className="w-[200px] h-[230px] dark:bg-zinc-800 dark:text-gray-200 rounded-lg mt-3 font-poppins p-2 relative ml-2">
      <div className="text-center font-medium mt-2">Completion Rate</div>
      <div className="w-[180px] h-[180px] relative mt-1">
        <div className="absolute flex justify-center items-center text-xl text-gray-200 font-medium font-poppins text-center top-0 left-0 w-full h-full">
          {completedRate}%
        </div>
        <ResponsivePie
          data={[
            {
              id: 0,
              value: parseFloat(completedRate),
              color: "#5480d9",
            },
            {
              id: 1,
              value: 100 - parseFloat(completedRate),
              color: "#363636",
            },
          ]}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          activeOuterRadiusOffset={5}
          colors={{ datum: "data.color" }}
          borderWidth={1}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          tooltip={() => <></>}
        ></ResponsivePie>
      </div>
    </div>
  );
};

export default CompletionRate;
