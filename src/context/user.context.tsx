import { createContext, ReactNode, useState } from "react";
import { Habit, UserData } from "../utils/types.utils";

export const defaultProfilePicURL =
  "https://i.ibb.co/dBr1HsM/default-profile-300x284.png";

export type UserContextType = {
  currentUser: UserData | null;

  setCurrentUser: (currentUser: UserData | null) => void;
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  setHabits: (habits: Habit[]) => void;
  editHabit: (habit: Habit) => void;
  removeHabit: (habit: Habit) => void;
};

const defaultContext: UserContextType = {
  currentUser: null,
  setCurrentUser: () => {},
  habits: [],
  setHabits: () => {},
  editHabit: () => {},
  addHabit: () => {},
  removeHabit: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);

  const addHabit = (habit: Habit) => {
    const newHabits = habits.concat(habit);
    setHabits(newHabits);
  };

  const editHabit = (other: Habit) => {
    const newHabits = habits.map((h: Habit) => {
      if (h.timeStamp === other.timeStamp) {
        return other;
      }
      return h;
    });
    setHabits(newHabits);
  };

  const removeHabit = (habit: Habit) => {
    const newHabits = habits.filter((h) => h.timeStamp !== habit.timeStamp);
    setHabits(newHabits);
  };

  return (
    <UserContext.Provider
      value={{
        editHabit,
        currentUser,
        setCurrentUser,

        habits,
        setHabits,
        addHabit,
        removeHabit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
