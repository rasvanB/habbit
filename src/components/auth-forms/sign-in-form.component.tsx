import { useEffect, useState } from "react";
import Divider from "../other/divider.component";
import InputBox from "../other/input-box.component";
import Button from "../other/button.component";
import LoginButton from "./login-button.component";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Message from "../other/message.component";
import { useNavigate } from "react-router-dom";
import {
  getErrorMessages,
  LoginScheme,
  LoginType,
} from "../../utils/auth.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { typesList } from "../other/provider-icon.component";
import AuthPrompt from "./auth-prompt.component";

const SignInForm = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginScheme),
    criteriaMode: "all",
  });

  useEffect(() => {
    setErrorMessages(getErrorMessages(errors));
  }, [errors]);

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    const result = await signInUserWithEmailAndPassword(
      data.email,
      data.password
    );
    if (result.error) setErrorMessages([result.error, ...errorMessages]);
    else navigate("/app");
  };

  return (
    <div className="dark:bg-zinc-800 bg-slate-100 py-10 px-5 mobile:px-10 sm:rounded-2xl w-full mobile:w-[400px] mobile:rounded-lg">
      <h1 className="dark:text-gray-100 text-center font-poppins font-medium text-zinc-800 text-4xl mb-7">
        Sign in
      </h1>
      {errorMessages[0] ? <Message message={errorMessages[0]} isError /> : null}
      <div className="flex justify-center gap-5 my-5">
        {typesList.map((type) => (
          <LoginButton type={type} key={type} />
        ))}
      </div>
      <Divider text="or Sign In with Email" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-2"
      >
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
      <AuthPrompt
        text="Don't have an account?"
        linkText="Sign Up"
        linkPath="/auth/sign-up"
      />
    </div>
  );
};
export default SignInForm;
