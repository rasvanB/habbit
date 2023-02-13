import Button from "../other/button.component";
import { Link } from "react-router-dom";
import InputBox from "../other/input-box.component";
import { useEffect, useState } from "react";
import Message from "../other/message.component";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getErrorMessages,
  SignUpScheme,
  SignUpType,
} from "../../utils/auth.utils";

import {
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

const fields = [
  {
    label: "Display name",
    value: "username",
    type: "text",
  },
  {
    label: "Email",
    value: "email",
    type: "email",
  },
  {
    label: "Password",
    value: "password",
    type: "password",
  },
  {
    label: "Confirm password",
    value: "confirmPassword",
    type: "password",
  },
] as const;

const SignUpForm = () => {
  const [message, setMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpScheme),
    criteriaMode: "all",
  });

  useEffect(() => {
    setErrorMessages(getErrorMessages(errors));
  }, [errors]);

  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    const result = await createAuthUserWithEmailAndPassword(
      data.email,
      data.password,
      {
        displayName: data.username,
      }
    );
    if (result.error) setErrorMessages([result.error, ...errorMessages]);
    else {
      setMessage("Email verification sent, check your inbox");
      signOutUser();
    }
  };

  return (
    <div className="dark:bg-zinc-800 bg-slate-100 py-10 px-5 mobile:px-10 sm:rounded-2xl w-full mobile:w-[400px] mobile:rounded-lg">
      <h1 className="dark:text-gray-100 text-center font-poppins font-medium text-zinc-800 text-4xl mb-5">
        Sign up
      </h1>
      {errorMessages[0] || message ? (
        <Message
          message={errorMessages[0] ? errorMessages[0] : message}
          isError={errorMessages[0] ? true : false}
        />
      ) : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 pt-3"
      >
        {fields.map((field) => (
          <InputBox
            isFormInput
            key={field.value}
            label={field.label}
            placeholder={field.label.toLowerCase()}
            type={field.type}
            {...register(field.value)}
          />
        ))}
        <Button buttonStyle="submit" type="submit">
          Sign Up
        </Button>
      </form>
      <div className="font-poppins mt-3 text-zinc-800 dark:text-gray-200 text-sm sm:text-md">
        Already have an account?
        <Link to="/auth/sign-in">
          <span className="pl-1 hover:from-indigo-500 hover:to-blue-400 cursor-pointer text-transparent font-extrabold text-md bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
};
export default SignUpForm;
