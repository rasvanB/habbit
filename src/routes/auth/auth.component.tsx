import AuthContainer from "../../components/auth-container.component";
import Button from "../../components/button.component";
const AuthPage = () => {
  return (
    <div className="h-screen w-screen bg-mesh-bg bg-cover bg-no-repeat bg-center">
      <AuthContainer>
        <h1 className="font-poppins text-4xl">Sign in</h1>
      </AuthContainer>
    </div>
  );
};
export default AuthPage;
