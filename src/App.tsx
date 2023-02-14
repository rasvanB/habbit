import { Routes, Route } from "react-router-dom";
import LandingPage from "./routes/landing/landing.component";
import { useContext, useEffect } from "react";
import NotFound from "./routes/not-found/not-found.component";
import AuthPage from "./routes/auth/auth.component";
import {
  getUserData,
  onAuthStateChangeListener,
} from "./utils/firebase/firebase.utils";
import { UserContext } from "./context/user.context";
import Dashboard from "./routes/dashboard/dashboard.component";

const App = () => {
  const { setCurrentUser, setLoading, loading, setHabits } =
    useContext(UserContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener(async (user) => {
      if (user) {
        if (
          user.providerData[0].providerId === "password" &&
          !user.emailVerified
        )
          return;
        const data = await getUserData(user.uid);
        if (data) {
          setCurrentUser(data.user);
          setHabits(data.habits);
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [setCurrentUser, setLoading, loading]);

  return (
    <div>
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
