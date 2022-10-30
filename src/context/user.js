import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  isAdmin: false,
  user: {},
  userId: {},
  data: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("username", payload.username);
      localStorage.setItem("role", payload.status);
      localStorage.setItem("userId", payload.id);
      return {
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("productCount");
      return {
        isLogin: false,
        user: {},
        data: [],
      };
    case "DATA":
      localStorage.setItem("length", payload);
      return {
        data: payload,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // proses useReducer

  // proses create context
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
