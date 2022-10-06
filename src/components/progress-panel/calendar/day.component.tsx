type DateProps = {
  active: boolean;
  isSurplus: boolean;
  date: Date;
  activeCompletedStyle?: string;
  inactiveCompletedStyle?: string;
  onClick?: () => void;
};

const Day = ({
  active,
  isSurplus,
  date,
  activeCompletedStyle,
  inactiveCompletedStyle,
  onClick,
}: DateProps) => {
  let [activeStyle, inactiveStyle] = ["", ""];

  activeStyle = activeCompletedStyle
    ? activeCompletedStyle
    : "dark:text-blue-400 dark:outline-blue-500 outline outline-2 text-blue-600 outline-blue-500";
  inactiveStyle = inactiveCompletedStyle
    ? inactiveCompletedStyle
    : "dark:text-blue-900 dark:outline-blue-900 outline outline-2 text-blue-400 outline-blue-400";

  return (
    <div
      onClick={onClick}
      className={`${
        isSurplus
          ? active
            ? activeStyle
            : "dark:text-white text-neutral-800"
          : active
          ? inactiveStyle
          : "dark:text-gray-600 text-neutral-400"
      } text-center rounded-md p-1 px-1.5 font-medium select-none
      ${
        onClick
          ? "dark:hover:bg-neutral-600 hover:bg-gray-100 cursor-pointer"
          : ""
      }`}
      key={date.getTime()}
    >{`${date.getDate()}`}</div>
  );
};

export default Day;
