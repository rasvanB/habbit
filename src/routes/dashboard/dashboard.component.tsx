import Nav from "../../components/nav.component";
import Button from "../../components/button.component";
import AddModal from "../../components/add-modal.component";
import { useContext, useEffect, useState } from "react";
import { UserContext, defaultProfilePicURL } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import { getUserHabits } from "../../utils/firebase/firebase.utils";
import CardContainer from "../../components/card-container.component";

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
    if (currentUser) {
      getUserHabits(currentUser.uid);
    }
  }, [currentUser, navigate, loading]);

  return (
    <div className="flex flex-col h-screen dark:bg-zinc-800 bg-white">
      <Nav
        username={currentUser ? currentUser.displayName : "Guest"}
        photourl={currentUser ? currentUser.photoURL : defaultProfilePicURL}
      />
      <div className="mx-40 h-full border-x border-slate-300 dark:border-zinc-600">
        <Button onClick={toggleModal} buttonStyle="add-habit">
          Add Habit
        </Button>
        <CardContainer />
      </div>
      <AddModal isHidden={!modalOpen} closeModal={toggleModal} />
    </div>
  );
};
export default Dashboard;
