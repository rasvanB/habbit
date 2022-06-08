import { Link } from "react-router-dom";
import Option from "./option.component";
import Button from "./button.component";
const NavLinks = ({ open }: { open: boolean }) => {
  console.log(open);
  return (
    <div
      className={`
        flex bg-white dark:bg-zinc-800 absolute sm:static flex-col right-0  items-end sm:items-center sm:flex-row -z-10 ml-auto bg-opacity-70 w-full sm:w-auto transition-all duration-500 ease-in ${
          open
            ? "top-12 opacity-100 border-t-8 border-t-zinc-700"
            : "-top-52 opacity-0"
        } sm:opacity-100 pr-5 sm:pr-0 sm:border-t-0`}
    >
      <Option linkTo="/contact" text="Contact" />
      <Link className="sm:mr-6 pt-4 sm:pt-0" to="/auth">
        <Button buttonStyle="navbar-login" text="Log in"></Button>
      </Link>
      <Link to="/auth" className="pt-5 pb-6">
        <Button buttonStyle="navbar-signup" text="Sign up"></Button>
      </Link>
    </div>
  );
};

export default NavLinks;
