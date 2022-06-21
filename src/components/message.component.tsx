import IonIcon from "@reacticons/ionicons";
const Message = ({
  message,
  isError,
}: {
  message: string;
  isError: boolean;
}) => {
  return (
    <div
      className={`p-2 pr-4 flex items-center w-full ${
        isError ? "bg-red-500" : "bg-green-400"
      } bg-opacity-70 rounded-lg`}
    >
      <IonIcon
        name={`${
          isError ? "alert-circle-outline" : "checkmark-circle-outline"
        }`}
        size="large"
        className="text-red-100 pr-2"
      ></IonIcon>
      <span className="text-sm font-poppins text-white">{`${message}`}</span>
    </div>
  );
};
export default Message;
