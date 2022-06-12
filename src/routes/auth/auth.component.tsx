import { useParams } from "react-router-dom";
import SignInForm from "../../components/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form.component";

// #TODO: 404 page for non-existent routes

const AuthPage = () => {
  const { auth } = useParams();
  return (
    <div className="h-screen w-screen dark:bg-mesh-bg-dark bg-mesh-bg bg-cover bg-no-repeat bg-center flex items-center justify-center">
      {auth === "sign-in" ? (
        <SignInForm />
      ) : (
        auth === "sign-up" && <SignUpForm />
      )}
    </div>
  );
};
export default AuthPage;
