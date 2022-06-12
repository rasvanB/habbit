import { FC } from "react";

type FormInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
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
        className="dark:bg-zinc-700 py-2 px-6 rounded-lg outline outline-1 outline-zinc-200 dark:outline-zinc-600 text-sm dark:text-gray-100"
      />
    </div>
  );
};

export default FormInput;
