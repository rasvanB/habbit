import Nav from "../../components/nav.component";
import Button from "../../components/button.component";
import AddModal from "../../components/add-modal.component";
import { useContext, useEffect, useState } from "react";
import {
  UserContext,
  defaultProfilePicURL,
  Habit,
} from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import HabitCard from "../../components/habit-card.component";
import {
  deleteHabitFromUser,
  getUserHabits,
} from "../../utils/firebase/firebase.utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading, habits, removeHabit } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRemoveHabit = (habit: Habit) => {
    if (currentUser) {
      removeHabit(habit);
      deleteHabitFromUser(currentUser.uid, habit);
    }
  };

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
        {habits.map((habit) => {
          return (
            <HabitCard
              key={habit.name + Math.floor(Math.random() * 1000)}
              habit={habit}
              onClick={() => {
                handleRemoveHabit(habit);
              }}
            />
          );
        })}
      </div>
      <AddModal isHidden={!modalOpen} closeModal={toggleModal} />
    </div>
  );
};
export default Dashboard;
