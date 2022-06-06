import background from "../assets/bg.png";
import Button from "./button.component";
const Hero = () => {
  return (
    <div
      className="h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-col text-zinc-800 text-xl font-bold items-center">
          <span className="text-6xl text-center mt-48">
            Build good{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-sky-500">
              Habits
            </span>
            , <br /> Change your lifestyle
          </span>
          <span className="mt-6 text-center font-semibold text-zinc-600">
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
