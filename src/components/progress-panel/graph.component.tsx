import { ResponsiveBarCanvas } from "@nivo/bar";
import { useContext, useEffect, useState } from "react";
import { PanelContext } from "../../context/progress-panel.context";
import { ThemeContext } from "../../context/theme.context";

const Graph = () => {
  const [reload, setReload] = useState(false);
  const { selectedHabit } = useContext(PanelContext);
  const { darkMode } = useContext(ThemeContext);

  const defaultData = [
    {
      value: 0,
      month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    },
  ];

  const getProgressByMonth = () => {
    if (selectedHabit && selectedHabit.activeDays) {
      let dataAsObj: any = {};
      let dataAsArr = [];
      if (selectedHabit.activeDays.length > 0) {
        for (let i = 0; i < selectedHabit.activeDays.length; i++) {
          let month = selectedHabit.activeDays[i].date.slice(0, -3);
          if (!dataAsObj.hasOwnProperty(month)) {
            Object.assign(dataAsObj, {
              [month]: selectedHabit.activeDays[i].progress,
            });
          } else {
            Object.assign(dataAsObj, {
              [month]: dataAsObj[month] + selectedHabit.activeDays[i].progress,
            });
          }
        }
        for (const property in dataAsObj) {
          dataAsArr.push({ month: property, value: dataAsObj[property] });
        }
      }
      return dataAsArr;
    }
    return [];
  };

  let data = getProgressByMonth();
  if (data.length === 0) data = defaultData;

  useEffect(() => {
    if (selectedHabit) {
      setTimeout(() => {
        setReload(true);
      }, 1000);
    }
  }, [reload, selectedHabit]);

  return (
    <div className="w-[600px] h-[380px] dark:bg-zinc-800 bg-white shadow-sm dark:text-gray-200 rounded-lg pt-2 px-2 mt-3 pr-5 pb-10">
      <div className="text-center font-medium mt-2 font-poppins dark:text-gray-200 mb-2">
        Progress by month
      </div>
      <ResponsiveBarCanvas
        data={data}
        keys={["value"]}
        indexBy="month"
        margin={{
          top: 10,
          right: 10,
          bottom: 36,
          left: 36,
        }}
        colors={["#3B82F6"]}
        borderRadius={5}
        padding={0.3}
        enableLabel={false}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: "#A3A3A3",
              },
              text: {
                fill: darkMode ? "#A3A3A3" : "#4e4e4e",
              },
            },
          },
          grid: {
            line: {
              stroke: darkMode ? "#383838" : "#e0e0e0",
              strokeWidth: 2,
            },
          },
          tooltip: {
            container: {
              background: darkMode ? "#383838" : "white",
              color: darkMode ? "white" : "#383838",
            },
          },
        }}
      ></ResponsiveBarCanvas>
    </div>
  );
};

export default Graph;
