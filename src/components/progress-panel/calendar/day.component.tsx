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
            ? "text-blue-400"
            : "text-white"
          : "text-neutral-600"
      } text-center`}
      key={date.getTime()}
    >{`${date.getDate()}`}</div>
  );
};

export default Day;
