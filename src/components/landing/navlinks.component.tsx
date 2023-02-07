import { Link } from "react-router-dom";
import Option from "./option.component";
import Button from "../other/button.component";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const NavLinks = ({ open }: { open: boolean }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <div
      className={`
        flex bg-white sm:bg-opacity-0 dark:bg-zinc-800 absolute sm:static flex-col right-0 items-end sm:items-center sm:flex-row -z-10 ml-auto w-full sm:w-auto transition-all duration-500 ease-in ${
          open
            ? "top-12 opacity-100 border-t-8 border-t-slate-200 dark:border-t-zinc-700"
            : "-top-52 opacity-0"
        } sm:opacity-100 pr-5 sm:pr-0 sm:border-t-0`}
    >
      <Option linkTo="/contact" text="Contact" />
      <Link
        className="sm:mr-6 pt-4 sm:pt-0"
        to={`/${currentUser ? "app" : "auth/sign-in"}`}
      >
        <Button buttonStyle="navbar-login">Sign In</Button>
      </Link>
      <Link
        to={`/${currentUser ? "app" : "auth/sign-up"}`}
        className="pt-5 pb-6 sm:pt-0 sm:pb-0"
      >
        <Button buttonStyle="navbar-signup">Sign Up</Button>
      </Link>
    </div>
  );
};

export default NavLinks;
