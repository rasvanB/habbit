import { Link, To } from "react-router-dom";

type AuthPromptProps = {
  text: string;
  linkText: string;
  linkPath: To;
};

const AuthPrompt = ({ text, linkText, linkPath }: AuthPromptProps) => {
  return (
    <div className="font-poppins mt-3 text-zinc-800 dark:text-gray-200 text-sm sm:text-md">
      {text}
      <Link to={linkPath}>
        <span className="pl-1 hover:from-indigo-500 hover:to-blue-400 cursor-pointer text-transparent font-extrabold text-md bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          {linkText}
        </span>
      </Link>
    </div>
  );
};
export default AuthPrompt;
