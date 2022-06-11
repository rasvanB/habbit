import AuthContainer from "../../components/auth-container.component";
import SignInForm from "../../components/sign-in-form.component";
const AuthPage = () => {
  return (
    <div className="h-screen w-screen bg-mesh-bg bg-cover bg-no-repeat bg-center flex items-center justify-center">
      <AuthContainer>
        <SignInForm />
      </AuthContainer>
    </div>
  );
};
export default AuthPage;
