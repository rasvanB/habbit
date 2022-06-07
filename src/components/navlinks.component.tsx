import { Link } from "react-router-dom";
import Option from "./option.component";
import Button from "./button.component";

const NavLinks = () => {
  return (
    <div
      className={`
        flex flex-col w-full sm:w-auto bg-white dark:bg-zinc-800 items-end sm:items-center sm:flex pr-3 sm:pr-0 top-12 sm:flex-row content-center ml-auto absolute right-0 sm:static bg-opacity-70`}
    >
      <Option linkTo="/contact" text="Contact" />
      <Link className="sm:mr-6" to="/auth">
        <Button buttonStyle="navbar-login" text="Log in"></Button>
      </Link>
      <Link to="/auth">
        <Button buttonStyle="navbar-signup" text="Sign up"></Button>
      </Link>
    </div>
  );
};

export default NavLinks;
