import { useState } from "react";
import Divider from "./divider.component";
import InputBox from "./input-box.component";
import Button from "./button.component";
import LoginButton from "./login-button.component";
import { signInUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";
import Message from "./message.component";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validateSignIn } from "../utils/auth.utils";

const defaultFormState = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(defaultFormState);
  const { email, password } = formState;
  const [errorMessage, setErrorMessage] = useState("");

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
    let error: string | undefined = "";
    error = validateSignIn(email, password);
    if (error) {
      setErrorMessage(error);
      return;
    }
    await signInUserWithEmailAndPassword(email, password)
      .then((err) => {
        error = err;
        if (error) {
          switch (error) {
            case "auth/user-not-found":
              error = "User not found";
              break;
            case "auth/wrong-password":
              error = "Wrong password";
              break;
            case "auth/invalid-email":
              error = "Invalid email";
              break;
            case "auth/email-not-verified":
              error = "Email not verified";
              break;
            default:
              error = "Something went wrong";
              break;
          }
        }
      })
      .finally(() => {
        setErrorMessage(error ? error : "");
        if (!error) {
          resetFormFields();
          navigate("/app");
        }
      });
  };

  return (
    <div className="dark:bg-zinc-800 bg-slate-100 py-10 px-5 mobile:px-10 sm:rounded-2xl w-full mobile:w-[400px] mobile:rounded-lg">
      <h1 className="dark:text-gray-100 text-center font-poppins font-medium text-zinc-800 text-4xl mb-7">
        Sign in
      </h1>
      {errorMessage && <Message message={errorMessage} isError />}
      <div className="flex justify-center my-5">
        <LoginButton type="google" />
        <LoginButton type="twitter" />
        <LoginButton type="facebook" />
      </div>
      <Divider text="or Sign In with Email" />
      <form onSubmit={handleSubmit}>
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
            value={password}
            label="Password"
            onChange={handleChange}
            placeholder="password"
            type="password"
          />
        </div>
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
