import { FC, useContext } from "react";
import { signOutUser } from "../utils/firebase/firebase.utils";
import { UserContext } from "../context/user.context";

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
    <div className="bg-slate-100 flex items-center">
      <div
        onClick={handleSignOut}
        style={{
          backgroundImage: `url(${photourl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-[50px] h-[50px] rounded-full outline-1"
      ></div>
      <h1 className="ml-3 font-poppins font-semibold text-indigo-400">
        {`Hello, ${username.split(" ")[0]}`}
      </h1>
    </div>
  );
};
export default Nav;
