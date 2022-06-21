import { createContext, ReactNode } from "react";

export type HabitType = {
  name: string;
  iconName: string;
  iconColor: string;
  requirement: string;
  description: string;
  goal: number;
  unit: string;
};

type HabitContextType = {
  isIconsMenuOpen: boolean;
  setIconsMenuOpen: (openState: boolean) => void;
  isColorsMenuOpen: boolean;
  setColorsMenuOpen: (openState: boolean) => void;
};

export const HabitContext = createContext<HabitContextType | null>(null);

export const HabitProvider = ({ children }: { children: ReactNode }) => {};
