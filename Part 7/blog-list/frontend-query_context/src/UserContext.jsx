import { createContext, useContext, useReducer } from "react";

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.types) {
    case "setUser": {
      return action.payload;
    }
    case "removeUser": {
      return null;
    }
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const [user] = useContext(UserContext);
  return user;
};

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext);
  return dispatch;
};

export default UserContext;
