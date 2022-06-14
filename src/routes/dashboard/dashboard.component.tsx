import Nav from "../../components/nav.component";
import Button from "../../components/button.component";
import AddModal from "../../components/add-modal.component";
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
      }
    }
  }, [currentUser, navigate, loading]);

  return (
    <div className="flex flex-col h-screen dark:bg-zinc-800 bg-white">
      <Nav
        username={currentUser ? currentUser.displayName : "Guest"}
        photourl={
          currentUser
            ? currentUser.photoURL
            : "https://i.ibb.co/dBr1HsM/default-profile-300x284.png"
        }
      />
      <div className="mx-40 h-full border-x border-slate-300 dark:border-zinc-600">
        <Button buttonStyle="add-habit" text="Add Habit" />
      </div>
      <AddModal isHidden />
    </div>
  );
};
export default Dashboard;
