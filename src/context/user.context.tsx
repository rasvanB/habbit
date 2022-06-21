import { createContext, ReactNode, useState } from "react";
import { HabitType } from "./habit.context";

export type UserData = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

export type UserContextType = {
  currentUser: UserData | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setCurrentUser: (currentUser: UserData | null) => void;
  habits: HabitType[];
  addHabit: (habit: HabitType) => void;
  setHabits: (habits: HabitType[]) => void;
  removeHabit: (habit: HabitType) => void;
};

const defaultContext: UserContextType = {
  currentUser: null,
  setCurrentUser: () => {},
  loading: true,
  setLoading: () => {},
  habits: [],
  setHabits: () => {},
  addHabit: () => {},
  removeHabit: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

// TODO: implement remove habits / add habits

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<HabitType[]>([]);
  const addHabit = (habit: HabitType) => {
    habits.push(habit);
  };
  const removeHabit = (habit: HabitType) => {};
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
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
