export type buttonStyles =
  | "cancel"
  | "save-changes"
  | "navbar-login"
  | "navbar-signup"
  | "hero"
  | "submit"
  | "add-habit"
  | "select-icon"
  | "select-color"
  | "increment"
  | "decrement";

export const buttonClasses = {
  signupButtonStyle:
    "bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded whitespace-nowrap",
  loginButtonStyle:
    "text-blue-400 font-semibold py-2 px-4 rounded hover:text-blue-600 outline outline-2 whitespace-nowrap",
  heroButtonStyle:
    "bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-5 rounded-xl mt-5 whitespace-nowrap",
  submitButton:
    "bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold py-2 px-4 rounded whitespace-nowrap mt-5",
  addHabitButton:
    "bg-blue-500 drop-shadow-[0px_5px_0px_rgba(52,115,217,1)] hover:drop-shadow-none hover:translate-y-[5px] transition-all duration-[50] hover:bg-blue-600 min-w-[150px] text-white font-semibold py-1 mt-3 px-4 rounded whitespace-nowrap",
  selectIcon:
    "dark:bg-zinc-600 bg-white outline outline-1 focus:outline-2 outline-zinc-200 dark:outline-zinc-500 dark:text-white text-zinc-800 font-semibold p-[5px] ml-5 rounded whitespace-nowrap flex items-center justify-center",
  selectColor:
    "dark:bg-zinc-600 bg-white outline outline-1 hover:outline-2 outline-zinc-400 font-semibold p-[5px] rounded whitespace-nowrap flex items-center justify-center",
  increment:
    "bg-blue-400 hover:bg-blue-500 w-[30px] flex items-center justify-center rouded-md text-white text-lg h-[30px] font-poppins rounded-l-full",
  decrement:
    "bg-blue-400 hover:bg-blue-500 w-[30px] flex items-center justify-center rouded-md text-white text-lg h-[30px] font-poppins rounded-r-full",
  saveChanges:
    "bg-blue-500 hover:bg-blue-600 min-w-[150px] text-white font-regular py-1 mt-5 w-fit rounded whitespace-nowrap mr-3 outline outline-1 outline-blue-400",
  cancel:
    "bg-black bg-opacity-10 hover:bg-opacity-20 dark:text-white text-black font-regular py-1 mt-5 px-4 w-fit rounded outline outline-1 dark:outline-neutral-500 outline-neutral-300",
};
