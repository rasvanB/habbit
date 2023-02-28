import { cva } from "class-variance-authority";

export const inputStyles = cva([], {
  variants: {
    intent: {
      "form-input":
        "dark:bg-zinc-700 py-2 px-6 rounded-lg outline outline-1 outline-zinc-200 dark:outline-zinc-600 text-sm dark:text-gray-100 focus:outline-2 focus:dark:outline-zinc-500 focus:outline-zinc-400 w-full",
      "modal-input":
        "dark:bg-zinc-600 py-2 px-3 rounded-sm outline outline-1 outline-zinc-200 dark:outline-zinc-500 mobile:text-sm text-xs dark:text-gray-100 focus:outline-2 focus:dark:outline-zinc-500 focus:outline-zinc-400 w-full",
    },
  },
});
