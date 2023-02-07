import { createContext, ReactNode, useState } from "react";

export type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

const defaultContext: ThemeContextType = {
  darkMode: true,
  setDarkMode: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
