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
      className="text-zinc-700 dark:text-zinc-200 pt-3 sm:pt-0 sm:mr-10 bold font-normal text-lg hover:text-zinc-500"
    >
      <span className="font-poppins">{`${text}`}</span>
    </Link>
  );
};
export default Option;
