import { FC } from "react";
type AuthContainerProps = {
  children?: React.ReactNode;
};

const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="bg-slate-100 flex flex-column w-fit p-5">{children}</div>
  );
};
export default AuthContainer;
