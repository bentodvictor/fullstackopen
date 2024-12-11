import { useNotificationValue } from "../NotificationContext";

export const Notification = () => {
  const notificationValue = useNotificationValue();

  if (!notificationValue) return;

  const { type, message } = notificationValue;
  const color = type === "error" ? "red" : "green";

  return (
    <div>
      <p
        style={{
          textTransform: "uppercase",
          color: color,
          fontWeight: "bold",
          border: `4px solid ${color}`,
          padding: "10px",
        }}
      >
        {message}
      </p>
    </div>
  );
};
