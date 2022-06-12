import SignInForm from "../../components/sign-in-form.component";
const AuthPage = () => {
  return (
    <div className="h-screen w-screen dark:bg-mesh-bg-dark bg-mesh-bg bg-cover bg-no-repeat bg-center flex items-center justify-center">
      <SignInForm />
    </div>
  );
};
export default AuthPage;
