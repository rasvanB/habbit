import Button from "../other/button.component";
import { Link } from "react-router-dom";
import InputBox from "../other/input-box.component";
import { useState } from "react";
import Message from "../other/message.component";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpScheme, SignUpType } from "../../utils/auth.utils";

import {
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

const SignUpForm = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpScheme),
    criteriaMode: "all",
  });

  const errorMessages = Object.values(errors).map((error) => {
    return error.message;
  });

  console.log(errorMessages);
  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    console.log(data);
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const error = validateSignUp(email, password, confirmPassword, username);
  //   if (error) {
  //     setErrorMessage(error);
  //     return;
  //   }
  //   let errorMsg: string | null = "";
  //   await createAuthUserWithEmailAndPassword(email, password, {
  //     displayName: username,
  //   })
  //     .catch((error) => {
  //       switch (error.code) {
  //         case "auth/email-already-in-use":
  //           errorMsg = "Email already in use";
  //           break;
  //         case "auth/invalid-email":
  //           errorMsg = "Invalid email";
  //           break;
  //         case "auth/weak-password":
  //           errorMsg = "Weak password";
  //           break;
  //         default:
  //           errorMsg = "Something went wrong";
  //           break;
  //       }
  //     })
  //     .finally(() => {
  //       if (!errorMsg) {
  //         setMessage("Email verification sent, check your inbox");
  //         resetFormFields();
  //         signOutUser();
  //       } else {
  //         setErrorMessage(errorMsg);
  //       }
  //     });
  // };

  return (
    <div className="dark:bg-zinc-800 bg-slate-100 py-10 px-5 mobile:px-10 sm:rounded-2xl w-full mobile:w-[400px] mobile:rounded-lg">
      <h1 className="dark:text-gray-100 text-center font-poppins font-medium text-zinc-800 text-4xl mb-5">
        Sign up
      </h1>
      {errorMessages[0] ||
        (message && (
          <Message
            message={errorMessages[0] ? errorMessages[0] : message}
            isError={true}
          />
        ))}
      {message && <Message message={message} isError={false} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5">
          <InputBox
            isFormInput
            label="Display name"
            placeholder="display name"
            {...register("username")}
          />
        </div>
        <div className="mt-2">
          <InputBox
            isFormInput
            label="Email"
            placeholder="mail@website.com"
            {...register("email")}
          />
        </div>
        <div className="mt-2">
          <InputBox
            isFormInput
            label="Password"
            placeholder="password"
            type="password"
            {...register("password")}
          />
        </div>
        <div className="mt-2">
          <InputBox
            isFormInput
            label="Confirm password"
            placeholder="confirm password"
            type="password"
            {...register("confirmPassword")}
          />
        </div>
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
