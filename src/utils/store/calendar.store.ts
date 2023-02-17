import { create } from "zustand";

type CalendarStore = {
  selectedDate: Date;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedDate: (d: Date) => void;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  selectedDate: new Date(),
  editMode: false,
  setEditMode: (editMode: boolean) => set({ editMode }),
  setSelectedDate: (d: Date) => set({ selectedDate: d }),
}));
