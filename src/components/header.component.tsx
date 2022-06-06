import Option from "./option.component";
import { Link } from "react-router-dom";
import Button from "./button.component";
const Header = () => {
  return (
    <div className="mt-5 flex">
      <div className="mx-16 flex content-center ml-auto">
        <Option linkTo="/contact" text="contact" />
        <Link to="/sign-in">
          <Button buttonStyle="navbar"></Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
