import { useContext } from "react";
import { PanelContext } from "../../context/progress-panel.context";

const ProgressPanel = () => {
  // const { selectedHabit, setSelectedHabit } = useContext(PanelContext);
  const { isOpen } = useContext(PanelContext);
  return (
    <div
      className={`lg:w-[50%] w-[0px] h-full ${
        isOpen ? "lg:visible" : "hidden"
      } dark:bg-zinc-900 border-l dark:border-neutral-700 ml-3`}
    >
      Progress Panel
    </div>
  );
};
export default ProgressPanel;
