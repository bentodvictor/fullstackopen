import { useNotificationDispatch, useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const notificationValue = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notificationValue) {
    setTimeout(() => {
      notificationDispatch({ type: 'clean' })
    }, 5000);
  }

  return (
    <div style={notificationValue && style}>
      {notificationValue}
    </div>
  )
}

export default Notification
