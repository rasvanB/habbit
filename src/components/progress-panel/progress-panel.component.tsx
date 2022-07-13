import { useContext } from "react";
import { PanelContext } from "../../context/progress-panel.context";

const ProgressPanel = () => {
  // const { selectedHabit, setSelectedHabit } = useContext(PanelContext);
  const { isOpen, setOpen } = useContext(PanelContext);
  setOpen(true);
  return (
    <div
      className={`lg:w-[50%] w-[0px] h-full ${
        isOpen ? "lg:visible" : "hidden"
      } dark:bg-zinc-900 border-l border-neutral-700 ml-3`}
    >
      Progress Panel
    </div>
  );
};
export default ProgressPanel;
