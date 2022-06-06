import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./routes/landing/landing.component";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
