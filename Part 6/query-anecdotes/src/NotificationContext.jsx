import { createContext, useContext, useReducer } from "react";

const initialState = null;

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'notify':
            state = action.payload;
            return state;
        case 'clean':
            state = null;
            return state;
        default:
            break;
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState);

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[0];
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[1];
}

export default NotificationContext;