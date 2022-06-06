import Option from "./option.component";
import { Link } from "react-router-dom";
import Button from "./button.component";
const Header = () => {
  return (
    <div className="flex w-full fixed z-0 bg-white py-3 backdrop-blur-md bg-opacity-70">
      <div className="mx-40 flex content-center ml-auto">
        <Option linkTo="/contact" text="contact" />
        <Link className="mr-6" to="/auth">
          <Button buttonStyle="navbar-login" text="Log in"></Button>
        </Link>
        <Link to="/auth">
          <Button buttonStyle="navbar-signup" text="Sign up"></Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
