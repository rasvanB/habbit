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
    <div className="bg-slate-100 flex items-center p-3">
      <div onClick={handleSignOut} className="w-[30px] h-[30px] outline-1">
        <LazyLoadImage
          src={photourl}
          alt={username}
          referrerPolicy="no-referrer"
          className="rounded-md"
        />
      </div>
      <h1 className="ml-3 font-poppins font-medium text-zinc-800">
        {`Hello, ${username.split(" ")[0]}`}
      </h1>
    </div>
  );
};
export default Nav;
