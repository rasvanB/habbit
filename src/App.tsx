import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./routes/landing/landing.component";
import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import NotFound from "./routes/not-found/not-found.component";
const App = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  setDarkMode(true);
  return (
    <div className={darkMode ? "dark" : "light"}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
