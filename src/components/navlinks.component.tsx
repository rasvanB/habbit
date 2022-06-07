import { Link } from "react-router-dom";
import Option from "./option.component";
import Button from "./button.component";

const NavLinks = () => {
  return (
    <div
      className={`
        flex bg-white dark:bg-zinc-800 items-end items-center flex-row ml-auto bg-opacity-70`}
    >
      <Option linkTo="/contact" text="Contact" />
      <Link className="mr-6" to="/auth">
        <Button buttonStyle="navbar-login" text="Log in"></Button>
      </Link>
      <Link to="/auth">
        <Button buttonStyle="navbar-signup" text="Sign up"></Button>
      </Link>
    </div>
  );
};

export default NavLinks;
