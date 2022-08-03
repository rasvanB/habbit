import { createContext, ReactNode, useState } from "react";
import { Habit } from "./user.context";

type PanelContextType = {
  selectedHabit: Habit | null;
  selectedDate: Date;
  isOpen: boolean;
  setSelectedDate: (d: Date) => void;
  setSelectedHabit: (h: Habit) => void;
  setOpen: (x: boolean) => void;
};

const defaultPanelContext: PanelContextType = {
  selectedHabit: null,
  selectedDate: new Date(),
  isOpen: false,
  setSelectedDate: () => {},
  setSelectedHabit: () => {},
  setOpen: () => {},
};

export const PanelContext = createContext(defaultPanelContext);

type PanelProps = {
  children: ReactNode;
};

const PanelProvider = ({ children }: PanelProps) => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setOpen] = useState(false);

  return (
    <PanelContext.Provider
      value={{
        selectedHabit,
        setSelectedHabit,
        isOpen,
        setOpen,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export default PanelProvider;
