import { forwardRef } from "react";

import { inputStyles } from "../../utils/styles/input-styles";

type InputProps = {
  label?: string;
  isFormInput?: boolean;
  isIncrement?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputBox = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isFormInput, isIncrement, ...otherProps }, ref) => {
    return (
      <div className="form-input flex flex-col font-poppins w-full">
        {label && (
          <label
            htmlFor="name"
            className="text-zinc-700 dark:text-gray-200 pb-1"
          >
            {`${label}`}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            {...otherProps}
            className={`${
              isFormInput
                ? inputStyles({ intent: "form-input" })
                : inputStyles({ intent: "modal-input" })
            }`}
          />
        </div>
      </div>
    );
  }
);
export default InputBox;
