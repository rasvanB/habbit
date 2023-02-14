import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignInForm from "../../components/auth-forms/sign-in-form.component";
import SignUpForm from "../../components/auth-forms/sign-up-form.component";
import { UserContext } from "../../context/user.context";

const AuthPage = () => {
  const { currentUser } = useContext(UserContext);
  const { auth } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth !== "signin" && auth !== "sign-up") {
      navigate("/auth/sign-in");
    }
  }, [auth]);

  return (
    <div className="bg-zinc-700">
      {!currentUser && (
        <div className="h-screen w-screen dark:bg-mesh-bg-dark bg-mesh-bg bg-cover bg-no-repeat bg-center flex items-center justify-center">
          {auth === "sign-in" ? (
            <SignInForm />
          ) : (
            auth === "sign-up" && <SignUpForm />
          )}
        </div>
      )}
    </div>
  );
};
export default AuthPage;
