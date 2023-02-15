import { create } from "zustand";
import { Habit, UserData } from "../types.utils";

export const defaultProfilePicURL =
  "https://i.ibb.co/dBr1HsM/default-profile-300x284.png";

export type UserStore = {
  currentUser: UserData | null;
  setCurrentUser: (currentUser: UserData | null) => void;
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  setHabits: (habits: Habit[]) => void;
  editHabit: (habit: Habit) => void;
  removeHabit: (habit: Habit) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser: UserData | null) => set({ currentUser }),
  habits: [],
  addHabit: (habit: Habit) =>
    set((state) => ({ habits: [...state.habits, habit] })),
  setHabits: (habits: Habit[]) => set({ habits }),
  editHabit: (habit: Habit) =>
    set((state) => ({
      habits: state.habits.map((h) =>
        h.timeStamp === habit.timeStamp ? h : habit
      ),
    })),
  removeHabit: (habit: Habit) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.timeStamp !== habit.timeStamp),
    })),
}));
