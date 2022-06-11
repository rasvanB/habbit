import { useState } from "react";

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
    <div>
      <h1>Sign in</h1>
    </div>
  );
};
export default SignInForm;
