import Nav from "../../components/nav.component";
import Button from "../../components/button.component";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useContext(UserContext);

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate("/auth/sign-in");
      } else {
      }
    }
  }, [currentUser, navigate, loading]);

  return (
    <div className="flex flex-col h-screen">
      <Nav
        username={currentUser ? currentUser.displayName : "Guest"}
        photourl={currentUser ? currentUser.photoURL : ""}
      />
      <div className="mx-40 h-full">
        <Button buttonStyle="add-habit" text="Add Habit" />
      </div>
    </div>
  );
};
export default Dashboard;
