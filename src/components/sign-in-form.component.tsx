import { useState } from "react";
import FormInput from "./form-input.component";
import Divider from "./divider.component";
import Button from "./button.component";
import LoginButtonsContainer from "./login-buttons-container.component";
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
    <div className="bg-slate-100 p-10 rounded-2xl">
      <h1 className="text-center font-poppins font-bold text-zinc-800 text-4xl">
        Sign in
      </h1>
      <LoginButtonsContainer />
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
    </div>
  );
};
export default SignInForm;
