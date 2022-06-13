import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./routes/landing/landing.component";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/theme.context";
import NotFound from "./routes/not-found/not-found.component";
import AuthPage from "./routes/auth/auth.component";
import { onAuthStateChangeListener } from "./utils/firebase/firebase.utils";
import { UserContext } from "./context/user.context";
import Dashboard from "./routes/dashboard/dashboard.component";
const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const { setCurrentUser, setLoading } = useContext(UserContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        setLoading(false);
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [setCurrentUser, setLoading]);
  return (
    <div className={darkMode ? "dark" : "light"}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/:auth" element={<AuthPage />} />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
