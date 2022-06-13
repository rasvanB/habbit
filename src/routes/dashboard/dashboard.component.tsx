import Nav from "../../components/nav.component";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useContext(UserContext);
  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate("/auth/signin");
      }
    }
  }, [currentUser, navigate, loading]);

  return (
    <div>
      <Nav username={`${currentUser ? currentUser.displayName : ""}`} />
    </div>
  );
};
export default Dashboard;
