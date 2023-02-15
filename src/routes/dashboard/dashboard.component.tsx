import Nav from "../../components/dashboard-nav/nav.component";
import Button from "../../components/other/button.component";
import AddModal from "../../components/add-modal/add-modal.component";
import { useContext, useEffect } from "react";
import { UserContext, defaultProfilePicURL } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import CardContainer from "../../components/card/card-container.component";
import { Toaster } from "react-hot-toast";
import { ModalContext } from "../../context/add-modal.context";
import ProgressPanel from "../../components/progress-panel/progress-panel.component";
import { Icon } from "@iconify/react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { isOpen, setOpen, setEditMode } = useContext(ModalContext);

  const toggleModal = () => {
    setOpen(!isOpen);
    setEditMode(false);
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/sign-in");
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex flex-col h-screen dark:bg-zinc-800 bg-white overflow-hidden">
      <Toaster />
      <Nav
        username={currentUser ? currentUser.displayName : "Guest"}
        photourl={currentUser ? currentUser.photoURL : defaultProfilePicURL}
      />
      <div className="ml-1 sm:ml-4 xl:ml-20 h-full flex">
        <div className="w-full max-w-[1200px] h-full lg:pr-3 xl:mr-10">
          <Button onClick={toggleModal} buttonStyle="add-habit">
            <div className="flex justify-center items-center">
              <Icon icon={"entypo:plus"} className="text-2xl mr-1" />
              <span className="mr-2">Add Habit</span>
            </div>
          </Button>
          <CardContainer />
        </div>
        <ProgressPanel />
      </div>
      <AddModal />
    </div>
  );
};
export default Dashboard;
