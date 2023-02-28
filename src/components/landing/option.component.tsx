import { Link, To } from "react-router-dom";

type OptionProps = {
  to: To;
  text: string;
};

const Option = ({ to, text }: OptionProps) => {
  return (
    <Link
      to={to}
      className="text-zinc-700 dark:text-zinc-200 pt-3 sm:pt-0 sm:mr-10 bold font-normal text-lg hover:text-zinc-500"
    >
      <span className="font-poppins">{`${text}`}</span>
    </Link>
  );
};
export default Option;
