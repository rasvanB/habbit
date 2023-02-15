import Button from "../other/button.component";
import { Link } from "react-router-dom";
import { useUserStore } from "../../utils/store/user.store";

const Hero = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  return (
    <div className="h-screen bg-cover bg-light-bg-mid dark:bg-dark-bg-mid bg-no-repeat bg-center bg-opacity-70 sm:dark:bg-dark-bg-svg sm:bg-light-bg-svg">
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-col text-zinc-800 text-xs mobile:text-m sm:text-lg md:text-xl font-bold items-center">
          <span className="text-3xl px-2 mobile:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins dark:text-white text-center mt-48 sm:px-5">
            Build good
            <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-400">
              Habits
            </span>
            , <br /> Change your lifestyle.
          </span>
          <span className="mt-3 sm:mt-6 mobile:max-w-md sm:max-w-xl px-5 text-center font-medium text-zinc-600 dark:text-gray-200">
            With Habbit, you can concentrate on what really counts. Manage your
            habits to become the best version of yourself.
          </span>
          <Link to={`/${currentUser ? "app" : "auth/sign-in"}`}>
            <Button buttonStyle="hero">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Hero;
