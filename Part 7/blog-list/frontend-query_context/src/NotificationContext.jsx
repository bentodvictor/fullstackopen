import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();
const initialState = null;

// Reducer
const notificationReducer = (state = initialState, action) => {
  switch (action.types) {
    case "notify": {
      return action.payload;
    }
    case "clean": {
      return null;
    }
    default: {
      return state;
    }
  }
};

// Provider
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

// Methods
// Return notification value
export const useNotificationValue = () => {
  const [value] = useContext(NotificationContext);
  return value;
};

// Return notification dispatch
export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext);
  return dispatch;
};

export default NotificationContext;
