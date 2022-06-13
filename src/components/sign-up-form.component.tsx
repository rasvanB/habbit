import Button from "./button.component";
import FormInput from "./form-input.component";
import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "./error-message.component";
import { createAuthUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";
const defaultFormState = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

// TODO - CHECK IF EMAIL IS ALREADY IN USE

const SignUpForm = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password, username, confirmPassword } = formState;

  const resetFormFields = () => {
    setFormState(defaultFormState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !username || !confirmPassword) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (email.length < 6 || !regexEmail.test(email)) {
      setErrorMessage("Invalid email");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    if (username.length <= 3) {
      setErrorMessage("Username must be at least 4 characters");
      return;
    }
    await createAuthUserWithEmailAndPassword(email, password, {
      displayName: username,
    })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("Email already in use");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email");
            break;
          case "auth/weak-password":
            setErrorMessage("Weak password");
            break;
          default:
            setErrorMessage("Something went wrong");
            break;
        }
      })
      .finally(() => {
        if (!errorMessage) {
          resetFormFields();
        }
      });
  };

  return (
    <div className="dark:bg-zinc-800 bg-slate-100 py-10 px-5 mobile:px-10 sm:rounded-2xl w-full mobile:w-auto mobile:rounded-lg">
      <h1 className="dark:text-gray-100 text-center font-poppins font-bold text-zinc-800 text-4xl mb-5">
        Sign up
      </h1>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          name="username"
          type="text"
          onChange={handleChange}
          value={username}
          placeholder="display name"
        />
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
          label="Password"
          value={password}
          onChange={handleChange}
          placeholder="password"
          type="password"
        />
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="confirm password"
          type="password"
        />
        <Button buttonStyle="submit" type="submit" text="Sign Up"></Button>
      </form>
      <div className="font-poppins mt-3 text-zinc-800 dark:text-gray-200 text-sm sm:text-md">
        Already have an account?{" "}
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
