type DateProps = {
  active: boolean;
  isSurplus: boolean;
  date: Date;
};
const Day = ({ active, isSurplus, date }: DateProps) => {
  return (
    <div
      className={`${
        isSurplus
          ? active
            ? "text-blue-400 outline outline-2 outline-blue-800"
            : "text-white"
          : active
          ? "text-blue-800 outline outline-2 outline-blue-800"
          : "text-gray-600"
      } text-center rounded-md p-1 px-1.5`}
      key={date.getTime()}
    >{`${date.getDate()}`}</div>
  );
};

export default Day;
