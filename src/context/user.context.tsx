import { createContext, ReactNode, useState } from "react";

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
};

const defaultContext: UserContextType = {
  currentUser: null,
  setCurrentUser: () => {},
  loading: true,
  setLoading: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
