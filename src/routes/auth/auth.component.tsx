import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignInForm from "../../components/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form.component";
import { UserContext } from "../../context/user.context";

const AuthPage = () => {
  const { currentUser, loading } = useContext(UserContext);
  const { auth } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(currentUser, loading);
    if (auth !== "signin" && auth !== "sign-up") {
      navigate("/auth/sign-in");
    }
    if (!loading) {
      if (currentUser) {
        navigate("/app");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, loading, currentUser]);

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
