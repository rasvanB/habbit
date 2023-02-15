import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./routes/landing/landing.component";
import { useEffect } from "react";
import NotFound from "./routes/not-found/not-found.component";
import AuthPage from "./routes/auth/auth.component";
import {
  getUserData,
  onAuthStateChangeListener,
} from "./utils/firebase/firebase.utils";
import Dashboard from "./routes/dashboard/dashboard.component";
import { useThemeStore } from "./utils/store/theme.store";
import { useUserStore } from "./utils/store/user.store";

const App = () => {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const setHabits = useUserStore((state) => state.setHabits);
  const currentUser = useUserStore((state) => state.currentUser);

  const navigate = useNavigate();
  const setDarkMode = useThemeStore((state) => state.setDarkMode);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener(async (user) => {
      if (user) {
        const userNotVerified =
          user.providerData[0].providerId === "password" && !user.emailVerified;

        if (userNotVerified) return;

        const data = await getUserData(user.uid);
        if (data) {
          setCurrentUser(data.user);
          setHabits(data.habits);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      navigate("/app");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? true : false;
        setDarkMode(colorScheme);
      });
    setDarkMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false
    );
  }, [setDarkMode]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/:auth" element={<AuthPage />} />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
