const Divider = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="mx-2 flex-shrink text-gray-400 text-sm">{`${text}`}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
};
export default Divider;
