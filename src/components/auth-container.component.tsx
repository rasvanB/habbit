import { FC } from "react";
type AuthContainerProps = {
  children?: React.ReactNode;
};

const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="bg-slate-100 flex flex-column w-fit p-10 rounded-2xl">
      {children}
    </div>
  );
};
export default AuthContainer;
