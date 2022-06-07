import Option from "./option.component";
import { Link } from "react-router-dom";
import Button from "./button.component";
import Logo from "./logo.component";
const Header = () => {
  return (
    <div className="flex w-full fixed z-0 dark:bg-zinc-800 bg-white py-3 px-5 lg:px-16 2xl:px-30 backdrop-blur-md bg-opacity-70">
      <Link className="flex content-center items-center" to="/">
        <Logo />
      </Link>
      <div className="flex content-center ml-auto">
        <Option linkTo="/contact" text="contact" />
        <div className="flex items-center">
          <Link className="mr-6" to="/auth">
            <Button buttonStyle="navbar-login" text="Log in"></Button>
          </Link>
          <Link to="/auth">
            <Button buttonStyle="navbar-signup" text="Sign up"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
