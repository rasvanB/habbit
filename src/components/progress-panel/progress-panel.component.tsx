import { usePanelStore } from "../../utils/store/panel.store";
import Calendar from "./calendar/calendar.component";
import CompletionRate from "./completion-rate.component";
import Graph from "./graph.component";
import Stats from "./stats.component";

const ProgressPanel = () => {
  const isOpen = usePanelStore((state) => state.isOpen);

  return (
    <div
      className={`lg:w-auto lg:ml-auto w-[0px] h-full ${
        isOpen
          ? "lg:visible lg:p-5 lg:pr-7 translate-x-5 lg:translate-x-0"
          : "hidden"
      } dark:bg-zinc-900 bg-neutral-100 border-l dark:border-neutral-700 lg:min-w-[650px] overflow-y-auto overflow-x-clip`}
    >
      <Stats />
      <div className="flex gap-1">
        <Calendar />
        <CompletionRate />
      </div>
      <Graph />
    </div>
  );
};
export default ProgressPanel;
