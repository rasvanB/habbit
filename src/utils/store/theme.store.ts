// create a zustand store for themes
import { create } from "zustand";

type ThemeStore = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: true,
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
}));
