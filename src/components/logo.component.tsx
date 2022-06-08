import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="cursor-pointer flex items-center min-w-[50px] justify-center">
      <img src={logo} alt="logo" className="z-10 h-7" />
    </div>
  );
};

export default Logo;
