import { FC } from "react";
import { signOutUser } from "../utils/firebase/firebase.utils";

type NavProps = {
  username: string;
  photourl: string;
};

const Nav: FC<NavProps> = ({ username, photourl }) => {
  return (
    <div className="bg-slate-100 flex items-center">
      <div
        onClick={() => signOutUser()}
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
