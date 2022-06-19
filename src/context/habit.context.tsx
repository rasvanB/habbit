import { createContext, ReactNode } from "react";

export type HabitType = {
  name: string;
  color: string;
  iconName: string;
  iconColor: string;
};

type HabitContextType = {
  isIconsMenuOpen: boolean;
  setIconsMenuOpen: (openState: boolean) => void;
  isColorsMenuOpen: boolean;
  setColorsMenuOpen: (openState: boolean) => void;
  habits: HabitType[];
  addHabit: (habit: HabitType) => void;
  removeHabit: (habit: HabitType) => void;
};

export const HabitContext = createContext<HabitContextType | null>(null);

export const HabitProvider = ({ children }: { children: ReactNode }) => {};
