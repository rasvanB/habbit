const Divider = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <div className="flex-grow border-t border-gray-500 "></div>
      <span
        className={`${
          text ? "mx-2" : "mx-0"
        } flex-shrink text-gray-500 text-sm`}
      >{`${text}`}</span>
      <div className="flex-grow border-t border-gray-500"></div>
    </div>
  );
};
export default Divider;
