import { FC, useContext } from "react";
import { signOutUser } from "../utils/firebase/firebase.utils";
import { UserContext } from "../context/user.context";
import { LazyLoadImage } from "react-lazy-load-image-component";
type NavProps = {
  username: string;
  photourl: string;
};

const Nav: FC<NavProps> = ({ username, photourl }) => {
  const { setLoading } = useContext(UserContext);
  const handleSignOut = async () => {
    await signOutUser();
    setLoading(false);
  };
  return (
    <div className="flex items-center py-3 px-40 bg-slate-100 dark:bg-zinc-900 border-b border-slate-300 dark:border-zinc-600">
      <div
        onClick={handleSignOut}
        className="w-[30px] h-[30px] outline-1 cursor-pointer"
      >
        <LazyLoadImage
          src={photourl}
          referrerPolicy="no-referrer"
          className="rounded-md outline outline-2 dark:outline-gray-700 outline-zinc-700"
        />
      </div>
      <h1 className="ml-3 font-poppins font-medium text-zinc-800 dark:text-gray-100">
        {`${username.split(" ")[0]}`}
      </h1>
    </div>
  );
};
export default Nav;
