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
  const getUser = async (uid: string) => {
    const user = await getUserDocData(uid);
    if (user) {
      setCurrentUser({
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        email: user.email,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        if (
          user.providerData[0].providerId === "password" &&
          !user.emailVerified
        ) {
          return;
        }
        getUser(user.uid);
      } else {
        setCurrentUser(null);
        setLoading(true);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
