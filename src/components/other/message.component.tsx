import { Icon } from "@iconify/react";

type MessageProps = {
  message: string;
  isError: boolean;
};

const Message = ({ message, isError }: MessageProps) => {
  return (
    <div
      className={`p-1 px-2 pr-4 flex items-center w-full ${
        isError ? "bg-red-500" : "bg-green-400"
      } bg-opacity-70 rounded-md`}
    >
      <Icon
        icon={`${isError ? "ep:warning" : "carbon:checkmark-outline"}`}
        className="text-white text-4xl pr-2"
      ></Icon>
      <span className="text-sm font-poppins text-white">{`${message}`}</span>
    </div>
  );
};
export default Message;
