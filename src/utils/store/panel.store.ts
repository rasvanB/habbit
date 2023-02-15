import { Habit } from "../types.utils";
import { create } from "zustand";

type PanelStore = {
  selectedHabit: Habit | null;
  selectedDate: Date;
  isOpen: boolean;
  setSelectedDate: (d: Date) => void;
  setSelectedHabit: (h: Habit | null) => void;
  setOpen: (x: boolean) => void;
};

export const usePanelStore = create<PanelStore>((set) => ({
  selectedHabit: null,
  selectedDate: new Date(),
  isOpen: false,
  setSelectedDate: (d: Date) => set({ selectedDate: d }),
  setSelectedHabit: (h: Habit | null) => set({ selectedHabit: h }),
  setOpen: (x: boolean) => set({ isOpen: x }),
}));
