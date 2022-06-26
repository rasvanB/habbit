import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

type ToastType = "error" | "warning" | "success";

export const showToast = (type: ToastType, message: string) => {
  let iconName = "";
  let iconColor = "";

  switch (type) {
    case "success":
      iconName = "carbon:checkmark-outline";
      iconColor = "text-green-600";
      break;
    case "warning":
      iconName = "carbon:warning-alt";
      iconColor = "text-yellow-500";
      break;
    case "error":
      iconName = "bx:error-circle";
      iconColor = "text-red-500";
      break;
  }

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "opacity-100" : "opacity-0"
        } max-w-xs bg-white border rounded-md shadow-lg dark:bg-zinc-800 dark:border-gray-700 transition-all duration-300`}
      >
        <div className="flex p-2">
          <div className="flex-shrink-0">
            <Icon icon={iconName} className={`${iconColor} text-xl`} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700 dark:text-gray-400 align-middle">
              {message}
            </p>
          </div>
        </div>
      </div>
    ),
    { duration: 2000 }
  );
};
export {};
