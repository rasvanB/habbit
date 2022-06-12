import IonIcon from "@reacticons/ionicons";
const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="p-2 pr-4 flex items-center w-full bg-red-400 bg-opacity-70 rounded-md">
      <IonIcon
        name="alert-circle-outline"
        size="large"
        className="text-zinc-700 dark:text-red-100 pr-2"
      ></IonIcon>
      <span className="text-sm font-poppins dark:text-white">{`${message}`}</span>
    </div>
  );
};
export default ErrorMessage;
