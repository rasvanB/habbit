import { createContext, ReactNode, useState } from "react";

type ProgressCalendarContextType = {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
};

const defaultContext: ProgressCalendarContextType = {
  selectedDate: new Date(),
  setSelectedDate: () => {},
};

export const ProgressCalendarContext = createContext(defaultContext);

type PCalendarProps = {
  children: ReactNode;
};

const ProgressCalendarProvider = ({ children }: PCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <ProgressCalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </ProgressCalendarContext.Provider>
  );
};

export default ProgressCalendarProvider;
