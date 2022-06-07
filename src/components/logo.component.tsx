import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="cursor-pointer flex items-center justify-center">
      <img src={logo} alt="logo" className="h-7" />
    </div>
  );
};

export default Logo;
