import { createContext, ReactNode, useState } from "react";
import { Habit } from "./user.context";

type PanelContextType = {
  selectedHabit: Habit | null;
  isOpen: boolean;
  setSelectedHabit: (h: Habit) => void;
  setOpen: (x: boolean) => void;
};

const defaultPanelContext: PanelContextType = {
  selectedHabit: null,
  isOpen: false,
  setSelectedHabit: () => {},
  setOpen: () => {},
};

export const PanelContext = createContext(defaultPanelContext);

type PanelProps = {
  children: ReactNode;
};

const PanelProvider = ({ children }: PanelProps) => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isOpen, setOpen] = useState(false);

  return (
    <PanelContext.Provider
      value={{ selectedHabit, setSelectedHabit, isOpen, setOpen }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export default PanelProvider;
