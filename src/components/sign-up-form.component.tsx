import Button from "./button.component";
import { Link } from "react-router-dom";
import InputBox from "./input-box.component";
import { useState } from "react";
import Message from "./message.component";
import { validateSignUp } from "../utils/auth.utils";
import {
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../utils/firebase/firebase.utils";

const defaultFormState = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const { email, password, username, confirmPassword } = formState;

  const resetFormFields = () => {
    setFormState(defaultFormState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setMessage("");
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateSignUp(email, password, confirmPassword, username);
    if (error) {
      setErrorMessage(error);
      return;
    }
    let errorMsg: string | null = "";
    await createAuthUserWithEmailAndPassword(email, password, {
      displayName: username,
    })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMsg = "Email already in use";
            break;
          case "auth/invalid-email":
            errorMsg = "Invalid email";
            break;
          case "auth/weak-password":
            errorMsg = "Weak password";
            break;
          default:
            errorMsg = "Something went wrong";
            break;
        }
      })
      .finally(() => {
        if (!errorMsg) {
          setMessage("Email verification sent, check your inbox");
          resetFormFields();
          signOutUser();
        } else {
          setErrorMessage(errorMsg);
        }
      });
  };

  return (
    <div className="dark:bg-zinc-800 bg-slate-100 py-10 px-5 mobile:px-10 sm:rounded-2xl w-full mobile:w-[400px] mobile:rounded-lg">
      <h1 className="dark:text-gray-100 text-center font-poppins font-medium text-zinc-800 text-4xl mb-5">
        Sign up
      </h1>
      {errorMessage && <Message message={errorMessage} isError />}
      {message && <Message message={message} isError={false} />}
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <InputBox
            isFormInput
            label="Display name"
            name="username"
            type="text"
            onChange={handleChange}
            value={username}
            placeholder="display name"
          />
        </div>
        <div className="mt-2">
          <InputBox
            isFormInput
            name="email"
            label="Email"
            value={email}
            type="email"
            onChange={handleChange}
            placeholder="mail@website.com"
          />
        </div>
        <div className="mt-2">
          <InputBox
            isFormInput
            name="password"
            label="Password"
            value={password}
            onChange={handleChange}
            placeholder="password"
            type="password"
          />
        </div>
        <div className="mt-2">
          <InputBox
            isFormInput
            name="confirmPassword"
            label="Confirm password"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="confirm password"
            type="password"
          />
        </div>
        <Button buttonStyle="submit" type="submit">
          Sign Up
        </Button>
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
