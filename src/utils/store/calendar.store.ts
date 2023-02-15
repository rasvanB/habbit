import { create } from "zustand";

type CalendarStore = {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (d: Date) => set({ selectedDate: d }),
}));
