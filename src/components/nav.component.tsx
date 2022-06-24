import { FC, useContext } from "react";
import { signOutUser } from "../utils/firebase/firebase.utils";
import { UserContext } from "../context/user.context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

type NavProps = {
  username: string;
  photourl: string;
};

const Nav: FC<NavProps> = ({ username, photourl }) => {
  const navigate = useNavigate();
  const { setLoading, setHabits } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOutUser();
    setLoading(true);
    setHabits([]);
    navigate("/auth/sign-in");
  };

  return (
    <div className="flex items-center py-3 px-5 sm:px-20 bg-slate-100 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-600">
      <div
        onClick={handleSignOut}
        className="w-[35px] h-[35px] min-w-[35px] min-h-[35px] cursor-pointer"
      >
        <LazyLoadImage
          src={photourl}
          referrerPolicy="no-referrer"
          className="rounded-md outline outline-2 outline-offset-2 outline-blue-400"
        />
      </div>
      <h1 className="ml-3 font-poppins font-medium text-zinc-800 dark:text-gray-100">
        {`${username.split(" ")[0]}`}
      </h1>
    </div>
  );
};
export default Nav;
