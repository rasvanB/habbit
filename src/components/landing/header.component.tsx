import { Link } from "react-router-dom";
import Logo from "../other/logo.component";
import NavLinks from "./navlinks.component";
import { useState } from "react";
import { Icon } from "@iconify/react";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`flex w-full fixed z-5 dark:bg-zinc-800 bg-white py-3 px-2 sm:px-5 lg:px-16 2xl:px-30 backdrop-blur-md bg-opacity-70 items-center `}
    >
      <Link to="/">
        <Logo />
      </Link>
      <div
        onClick={() => setOpen(!open)}
        className="w-full h-14 dark:bg-zinc-800 bg-slate-100 sm:bg-opacity-70 z-0 flex flex-row items-center justify-end select-none absolute sm:hidden right-0 dark:text-white text-zinc-700 cursor-pointer"
      >
        <Icon
          className="mr-3 text-white text-3xl"
          icon={`${open ? "heroicons-outline:x" : "gg:menu"}`}
        />
      </div>
      <NavLinks open={open} />
    </div>
  );
};

export default Header;
