import { useMemo, useState } from "react";
import Divider from "../other/divider.component";
import InputBox from "../other/input-box.component";
import Button from "../other/button.component";
import LoginButton from "./login-button.component";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Message from "../other/message.component";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getErrorMessages,
  LoginScheme,
  LoginType,
} from "../../utils/auth.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginScheme),
    criteriaMode: "all",
  });

  const errorMessages = useMemo(() => getErrorMessages(errors), [errors]);

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    const result = await signInUserWithEmailAndPassword(
      data.email,
      data.password
    );
    if (result.error) errorMessages.push(result.error.message);
    else navigate("/app");
  };

  return (
    <div className="dark:bg-zinc-800 bg-slate-100 py-10 px-5 mobile:px-10 sm:rounded-2xl w-full mobile:w-[400px] mobile:rounded-lg">
      <h1 className="dark:text-gray-100 text-center font-poppins font-medium text-zinc-800 text-4xl mb-7">
        Sign in
      </h1>
      {errorMessages[0] ? <Message message={errorMessages[0]} isError /> : null}
      <div className="flex justify-center gap-5 my-5">
        <LoginButton type="google" />
        <LoginButton type="twitter" />
        <LoginButton type="facebook" />
      </div>
      <Divider text="or Sign In with Email" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <InputBox
          isFormInput
          label="Email"
          placeholder="email"
          type="email"
          {...register("email")}
        />
        <InputBox
          isFormInput
          label="Password"
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <Button buttonStyle="submit" type="submit">
          Sign In
        </Button>
      </form>
      <div className="font-poppins mt-3 text-zinc-800 dark:text-gray-200 text-sm sm:text-md">
        Don't have an account?{" "}
        <Link to="/auth/sign-up">
          <span className="pl-1 hover:from-indigo-500 hover:to-blue-400 cursor-pointer text-transparent font-extrabold text-md bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
};
export default SignInForm;
