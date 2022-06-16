import Nav from "../../components/nav.component";
import Button from "../../components/button.component";
import AddModal from "../../components/add-modal.component";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/auth/sign-in");
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
      {/* TODO: turn this into component */}
      <div className="mx-40 h-full border-x border-slate-300 dark:border-zinc-600">
        <Button onClick={toggleModal} buttonStyle="add-habit">
          Add Habit
        </Button>
      </div>
      <AddModal isHidden={!modalOpen} close={toggleModal} />
    </div>
  );
};
export default Dashboard;
