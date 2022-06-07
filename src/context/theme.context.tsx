import { createContext, ReactNode, useState } from "react";

export type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

const defaultContext: ThemeContextType = {
  darkMode: false,
  setDarkMode: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
