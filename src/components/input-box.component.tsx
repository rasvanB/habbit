import { FC } from "react";
import { inputClasses } from "../utils/styles/input-styles";
type InputProps = {
  label?: string;
  isFormInput?: boolean;
  isIncrement?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputBox: FC<InputProps> = ({
  label,
  isFormInput,
  isIncrement,
  ...otherProps
}) => {
  return (
    <div className="form-input flex flex-col font-poppins w-full">
      {label && (
        <label htmlFor="name" className="text-zinc-700 dark:text-gray-200 pb-1">
          {`${label}`}
        </label>
      )}
      <div className="relative">
        <input
          {...otherProps}
          className={`${
            isFormInput
              ? inputClasses.formInputStyle
              : inputClasses.modalInputStyle
          }`}
        />
      </div>
    </div>
  );
};

export default InputBox;
