import { FC } from "react";

type FormInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="form-input flex flex-col font-poppins">
      <label htmlFor="name" className="font-semibold text-zinc-700 pb-1 pt-4">
        {`${label}`}
      </label>
      <input
        {...otherProps}
        className="py-2 px-6 rounded-lg outline outline-1 outline-zinc-200 text-sm"
      />
    </div>
  );
};

export default FormInput;
