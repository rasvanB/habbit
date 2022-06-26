import { Icon } from "@iconify/react";

type NotificationType = "error" | "warning" | "success";

type NotificationProps = {
  type: NotificationType;
};

const Notification = ({ type }: NotificationProps) => {
  return (
    <div>
      <Icon icon="" />
      <h1>WOW</h1>
    </div>
  );
};

export default Notification;
