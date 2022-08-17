type DateProps = {
  active: boolean;
  isSurplus: boolean;
  date: Date;
  testMode: boolean;
};
const Day = ({ active, isSurplus, date, testMode }: DateProps) => {
  return (
    <div
      className={`${
        isSurplus
          ? active
            ? "dark:text-blue-400 text-blue-600 outline outline-2 dark:outline-blue-500 outline-blue-500"
            : "dark:text-white text-neutral-800"
          : active
          ? "dark:text-blue-900 text-blue-400 outline outline-2 dark:outline-blue-900 outline-blue-400"
          : "dark:text-gray-600 text-neutral-400"
      } text-center rounded-md p-1 px-1.5 font-medium
      ${testMode ? "hover:dark:bg-[#313134] cursor-pointer" : ""}`}
      key={date.getTime()}
    >{`${date.getDate()}`}</div>
  );
};

export default Day;
