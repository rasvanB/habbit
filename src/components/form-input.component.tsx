import { FC } from "react";

type InputProps = {
  label: string;
  isFormInput?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const formInputStyle =
  "dark:bg-zinc-700 py-2 px-6 rounded-lg outline outline-1 outline-zinc-200 dark:outline-zinc-600 text-sm dark:text-gray-100 focus:outline-2 focus:dark:outline-zinc-500 focus:outline-zinc-400";
const modalInputStyle =
  "dark:bg-zinc-600 py-2 px-6 rounded-sm outline outline-1 outline-zinc-200 dark:outline-zinc-500 text-sm dark:text-gray-100 focus:outline-2 focus:dark:outline-zinc-500 focus:outline-zinc-400";

const InputBox: FC<InputProps> = ({ label, isFormInput, ...otherProps }) => {
  return (
    <div className="form-input flex flex-col font-poppins mobile:min-w-[300px]">
      <label
        htmlFor="name"
        className="text-zinc-700 dark:text-gray-100 pb-1 pt-4"
      >
        {`${label}`}
      </label>
      <input
        {...otherProps}
        className={`${isFormInput ? formInputStyle : modalInputStyle}`}
      />
    </div>
  );
};

export default InputBox;
