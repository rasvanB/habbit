import { Link } from "react-router-dom";
import { FC } from "react";
type OptionProps = {
  linkTo: string;
  text: string;
};
const Option: FC<OptionProps> = ({ linkTo, text }) => {
  return (
    <Link
      to={linkTo}
      className="text-zinc-700 dark:text-zinc-200 mr-10 bold flex font-normal text-lg items-center hover:text-zinc-500"
    >
      <span className="font-poppins hidden sm:block">{`${text}`}</span>
    </Link>
  );
};
export default Option;
