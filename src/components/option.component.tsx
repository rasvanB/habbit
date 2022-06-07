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
      className="mr-10 bold flex font-semibold text-lg items-center"
    >
      <span className="hidden sm:block">{`${text}`}</span>
    </Link>
  );
};
export default Option;
