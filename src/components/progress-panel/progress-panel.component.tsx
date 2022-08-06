import { useContext } from "react";
import { PanelContext } from "../../context/progress-panel.context";
import Calendar from "./calendar/calendar.component";
import CompletionRate from "./chart.component";
import Stats from "./stats.component";

const ProgressPanel = () => {
  const { isOpen } = useContext(PanelContext);

  return (
    <div
      className={`lg:w-[55%] w-[0px] h-full ${
        isOpen ? "lg:visible lg:p-3" : "hidden"
      } dark:bg-zinc-900 bg-neutral-100 border-l dark:border-neutral-700 ml-3`}
    >
      <Stats />
      <div className="flex">
        <Calendar />
        <CompletionRate />
      </div>
    </div>
  );
};
export default ProgressPanel;
