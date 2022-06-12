import { useState } from "react";
import FormInput from "./form-input.component";
import Divider from "./divider.component";
import Button from "./button.component";
import LoginButton from "./login-button.component";

const defaultFormState = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const { email, password } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="dark:bg-zinc-800 bg-slate-100 py-10 px-5 mobile:px-10 sm:rounded-2xl w-full mobile:w-auto mobile:rounded-lg">
      <h1 className="dark:text-gray-100 text-center font-poppins font-bold text-zinc-800 text-4xl">
        Sign in
      </h1>
      <div className="flex justify-center my-5">
        <LoginButton type="google" />
        <LoginButton type="twitter" />
        <LoginButton type="facebook" />
      </div>
      <Divider text="or Sign In with Email" />
      <form onSubmit={() => {}}>
        <FormInput
          name="email"
          label="Email"
          value={email}
          type="email"
          onChange={handleChange}
          placeholder="mail@website.com"
        />
        <FormInput
          name="password"
          value={password}
          label="Password"
          onChange={handleChange}
          placeholder="password"
          type="password"
        />
      </form>
      <Button buttonStyle="submit" text="Sign In"></Button>
      <div className="font-poppins mt-3 text-zinc-800 dark:text-gray-200 text-sm sm:text-md">
        Don't have an account?{" "}
        <span className="cursor-pointer text-transparent font-extrabold text-md bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          Sign Up
        </span>
      </div>
    </div>
  );
};
export default SignInForm;
