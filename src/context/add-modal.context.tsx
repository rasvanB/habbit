import { createContext, ReactNode, useState } from "react";
import { Habit } from "./user.context";

export const requirementOptions = [
  {
    value: "At least",
    label: "At least",
  },
  {
    value: "Exactly",
    label: "Exactly",
  },
  {
    value: "Less than",
    label: "Less than",
  },
];

export const defaultHabitState: Habit = {
  habitName: "",
  description: "",
  iconName: "",
  iconColor: "#5594f2",
  requirement: requirementOptions[0].value,
  unit: "",
  goal: 1,
  timeStamp: 0,
};

type ModalContextType = {
  isOpen: boolean;
  setOpen: (x: boolean) => void;
  editMode: boolean;
  setEditMode: (x: boolean) => void;
  currentHabit: Habit;
  setCurrentHabit: (x: Habit) => void;
  errorMessage: string;
  setErrorMessage: (x: string) => void;
};

const defaultModalContext = {
  isOpen: false,
  setOpen: () => {},
  editMode: false,
  setEditMode: () => {},
  currentHabit: {} as Habit,
  setCurrentHabit: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
};

export const ModalContext =
  createContext<ModalContextType>(defaultModalContext);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(defaultHabitState);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setOpen,
        editMode,
        setEditMode,
        currentHabit,
        setCurrentHabit,
        errorMessage,
        setErrorMessage,
      }}
    >
      {" "}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
