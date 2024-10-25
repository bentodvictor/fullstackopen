import { useDispatch, useSelector } from "react-redux"
import { notifyClear } from "../reducers/notificationReducer";

export const Notification = () => {
  const notification = useSelector(select => select.notification);
  const dispatch = useDispatch();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (notification) {
    setTimeout(() => {
      dispatch(notifyClear())
    }, 5000)
  }

  return notification && <div style={style}>{notification}</div>
}
