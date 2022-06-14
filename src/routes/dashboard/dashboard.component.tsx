import Nav from "../../components/nav.component";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useContext(UserContext);

  useEffect(() => {
    console.log(currentUser, loading);
    if (!loading) {
      if (!currentUser) {
        navigate("/auth/sign-in");
      } else {
      }
    }
  }, [currentUser, navigate, loading]);

  return (
    <div>
      <Nav
        username={currentUser ? currentUser.displayName : "Guest"}
        photourl={currentUser ? currentUser.photoURL : ""}
      />
    </div>
  );
};
export default Dashboard;
