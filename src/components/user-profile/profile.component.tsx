type ProfileProps = {
  isOpen: boolean;
  close: () => void;
};

const Profile = ({ isOpen, close }: ProfileProps) => {
  const handleClose = () => {
    close();
  };
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed top-0 left-0 h-screen w-screen justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm font-poppins z-50`}
      onClick={handleClose}
    >
      User
    </div>
  );
};

export default Profile;
