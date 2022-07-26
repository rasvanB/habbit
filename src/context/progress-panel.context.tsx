import { createContext, ReactNode, useState } from "react";
import { Habit } from "./user.context";

type PanelContextType = {
  selectedHabit: Habit | null;
  startingDate: Date;
  isOpen: boolean;
  setStartingDate: (d: Date) => void;
  setSelectedHabit: (h: Habit) => void;
  setOpen: (x: boolean) => void;
};

const defaultPanelContext: PanelContextType = {
  selectedHabit: null,
  startingDate: new Date(),
  isOpen: false,
  setStartingDate: () => {},
  setSelectedHabit: () => {},
  setOpen: () => {},
};

export const PanelContext = createContext(defaultPanelContext);

type PanelProps = {
  children: ReactNode;
};

const PanelProvider = ({ children }: PanelProps) => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [startingDate, setStartingDate] = useState<Date>(new Date());
  const [isOpen, setOpen] = useState(false);

  return (
    <PanelContext.Provider
      value={{
        selectedHabit,
        setSelectedHabit,
        isOpen,
        setOpen,
        startingDate,
        setStartingDate,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export default PanelProvider;
