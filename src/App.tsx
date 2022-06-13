import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./routes/landing/landing.component";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/theme.context";
import NotFound from "./routes/not-found/not-found.component";
import AuthPage from "./routes/auth/auth.component";
import {
  getUserDocData,
  onAuthStateChangeListener,
} from "./utils/firebase/firebase.utils";
import { UserContext } from "./context/user.context";
import Dashboard from "./routes/dashboard/dashboard.component";
const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const { setCurrentUser, setLoading } = useContext(UserContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      console.log("auth state changed", user);
      if (user) {
        getUserDocData(user.uid).then((userDoc) => {
          if (userDoc) {
            setCurrentUser({
              email: userDoc.email,
              displayName: userDoc.displayName,
              photoURL: userDoc.photoURL,
              uid: userDoc.uid,
            });
            setLoading(false);
          }
        });
      } else {
        setCurrentUser(null);
        setLoading(true);
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
