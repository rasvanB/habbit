export type buttonStyles =
  | "navbar-login"
  | "navbar-signup"
  | "hero"
  | "submit"
  | "add-habit"
  | "select-icon"
  | "select-color";

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
    "bg-blue-500 hover:bg-blue-600 min-w-[150px] text-white font-semibold py-2 px-4 rounded whitespace-nowrap",
  selectIcon:
    "dark:bg-zinc-600 bg-white outline outline-1 focus:outline-2 outline-zinc-200 dark:outline-zinc-500 dark:text-white text-zinc-800 font-semibold p-[5px] ml-5 rounded whitespace-nowrap flex items-center justify-center",
  selectColor:
    "dark:bg-zinc-600 bg-white outline outline-1 hover:outline-2 outline-zinc-400 font-semibold p-[5px] rounded whitespace-nowrap flex items-center justify-center",
};
