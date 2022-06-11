import LoginButton from "./login-button.component";

const LoginButtonsContainer = () => {
  return (
    <div className="flex justify-around my-5">
      <LoginButton type="google" />
      <LoginButton type="apple" />
      <LoginButton type="facebook" />
    </div>
  );
};
export default LoginButtonsContainer;
