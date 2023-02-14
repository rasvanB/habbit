import { Routes, Route, useNavigate } from "react-router-dom";
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
  const { setCurrentUser, setHabits, currentUser } = useContext(UserContext);
  const navigate = useNavigate();

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
