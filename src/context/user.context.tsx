import { createContext, ReactNode, useState } from "react";
import { User } from "firebase/auth";

export type UserContextType = {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
};

const defaultContext: UserContextType = {
  currentUser: null,
  setCurrentUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
