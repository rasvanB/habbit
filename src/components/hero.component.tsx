import Button from "./button.component";

const Hero = () => {
  return (
    <div className="h-screen bg-cover bg-light-bg dark:bg-dark-bg bg-no-repeat bg-center bg-opacity-70">
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-col text-zinc-800 text-sm sm:text-xl font-bold items-center">
          <span className="font-poppins dark:text-gray-200 text-4xl sm:text-5xl md:text-6xl text-center mt-48">
            Build good{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-sky-500">
              Habits
            </span>
            , <br /> Change your lifestyle
          </span>
          <span className="mt-6 text-center font-semibold text-zinc-600 dark:text-gray-300">
            With Habbit, you can concentrate on what really counts.
            <br /> Manage your habits to become the best version of yourself.
          </span>
          <Button buttonStyle="hero" text="Get Started"></Button>
        </div>
      </div>
    </div>
  );
};
export default Hero;
