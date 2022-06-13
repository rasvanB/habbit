import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignInForm from "../../components/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form.component";

const AuthPage = () => {
  const { auth } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth !== "signin" && auth !== "sign-up") {
      navigate("/auth/sign-in");
    }
  }, [auth, navigate]);

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
