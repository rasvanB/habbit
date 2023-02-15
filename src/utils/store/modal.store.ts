import { Habit } from "../types.utils";
import { create } from "zustand";

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
  activeDays: [],
};

type ModalStore = {
  isOpen: boolean;
  setOpen: (x: boolean) => void;
  editMode: boolean;
  setEditMode: (x: boolean) => void;
  currentHabit: Habit;
  setCurrentHabit: (x: Habit) => void;
  habitToEdit: Habit;
  setHabitToEdit: (x: Habit) => void;
  errorMessage: string;
  setErrorMessage: (x: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setOpen: (x: boolean) => set({ isOpen: x }),
  editMode: false,
  setEditMode: (x: boolean) => set({ editMode: x }),
  currentHabit: defaultHabitState,
  setCurrentHabit: (x: Habit) => set({ currentHabit: x }),
  habitToEdit: defaultHabitState,
  setHabitToEdit: (x: Habit) => set({ habitToEdit: x }),
  errorMessage: "",
  setErrorMessage: (x: string) => set({ errorMessage: x }),
}));
