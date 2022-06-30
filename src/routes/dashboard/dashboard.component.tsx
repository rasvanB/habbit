import Nav from "../../components/dashboard-nav/nav.component";
import Button from "../../components/other/button.component";
import AddModal from "../../components/add-modal/add-modal.component";
import { useContext, useEffect } from "react";
import { UserContext, defaultProfilePicURL } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import { getUserHabits } from "../../utils/firebase/firebase.utils";
import CardContainer from "../../components/card/card-container.component";
import { Toaster } from "react-hot-toast";
import { ModalContext } from "../../context/add-modal.context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useContext(UserContext);
  const { isOpen, setOpen, setEditMode } = useContext(ModalContext);

  const toggleModal = () => {
    setOpen(!isOpen);
    setEditMode(false);
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
      <Toaster />
      <Nav
        username={currentUser ? currentUser.displayName : "Guest"}
        photourl={currentUser ? currentUser.photoURL : defaultProfilePicURL}
      />
      <div className="mt-5 mx-5 sm:mx-20">
        <Button onClick={toggleModal} buttonStyle="add-habit">
          Add Habit
        </Button>
      </div>
      <div className="mx-5 sm:mx-20 h-full flex">
        <div className="w-[50%] h-full">
          <CardContainer />
        </div>
        <div className="w-[50%] h-full"></div>
      </div>
      <AddModal />
    </div>
  );
};
export default Dashboard;
