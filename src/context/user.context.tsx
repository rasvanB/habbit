import { createContext, ReactNode, useState } from "react";
import { User } from "firebase/auth";

export type UserData = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
};

export type UserContextType = {
  currentUser: User | null;
  userData?: UserData;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setCurrentUser: (currentUser: User | null) => void;
  setUserData: (userData: UserData) => void;
};

const defaultContext: UserContextType = {
  currentUser: null,
  setCurrentUser: () => {},
  setUserData: () => {},
  loading: true,
  setLoading: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        setUserData,
        userData,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
