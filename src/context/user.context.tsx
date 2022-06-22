import { createContext, ReactNode, useState } from "react";

export const defaultProfilePicURL =
  "https://i.ibb.co/dBr1HsM/default-profile-300x284.png";

export type Habit = {
  name: string;
  iconName: string;
  iconColor: string;
  requirement: string;
  description: string;
  goal: number;
  unit: string;
  timeStamp: number;
};

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
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  setHabits: (habits: Habit[]) => void;
  removeHabit: (habit: Habit) => void;
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

// TODO: implement remove habits

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [habits, setHabits] = useState<Habit[]>([]);
  const addHabit = (habit: Habit) => {
    habits.push(habit);
  };

  const removeHabit = (habit: Habit) => {
    const newHabits = habits.filter((h) => h.timeStamp !== habit.timeStamp);
    setHabits(newHabits);
  };

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
