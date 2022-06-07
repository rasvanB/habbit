import { Link } from "react-router-dom";
import Logo from "./logo.component";
import NavLinks from "./navlinks.component";
const Header = () => {
  return (
    <div className="flex w-full fixed z-0 dark:bg-zinc-800 bg-white py-3 px-5 lg:px-16 2xl:px-30 backdrop-blur-md bg-opacity-70 items-center">
      <Link to="/">
        <Logo />
      </Link>
      <NavLinks />
    </div>
  );
};

export default Header;
