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
    <div className="dark:bg-zinc-800 bg-slate-100 p-10 rounded-2xl">
      <h1 className="dark:text-gray-100 text-center font-poppins font-bold text-zinc-800 text-4xl">
        Sign in
      </h1>
      <div className="flex justify-around my-5">
        <LoginButton type="google" />
        <LoginButton type="apple" />
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
      <div className="font-poppins mt-3 text-zinc-800 dark:text-gray-200">
        Don't have an account?{" "}
        <span className="cursor-pointer text-transparent font-extrabold text-md bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          Sign Up
        </span>
      </div>
    </div>
  );
};
export default SignInForm;
