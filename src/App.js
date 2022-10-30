//module import start
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";
import AddList from "./pages/addList";
import { API, setAuthToken } from "./config/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import { useContext, useEffect } from "react";
//module import end

//page import start
import Home from "./pages/home";
import EditList from "./pages/editList";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/profile/profile";
import ListCategorySuplier from "./pages/categorySuplier";
import AdminList from "./pages/adminList";
import AddProfile from "./components/profile/addProfile";
import EditProfile from "./components/profile/editProfile";
import DetailFlow from "./pages/detailFlow";
import ComponentComplainAdmin from "./pages/complain-admin";
import ComponentComplain from "./pages/complain-user";
import Logger from "./pages/logger";
//page import end
//theme
export const ThemeContext = React.createContext(null);
//check token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  const [isLogins, setIsLogins] = useState();
  const [login, setLogin] = useState(false);
  //redirect Login
  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == true) {
      if (state.user.status === "superAdmin") {
        setIsLogins("superAdmin");
        navigate("/sidebar/dashboard");
      } else if (state.user.status === "admin") {
        setIsLogins("admin");
        navigate("/sidebar/dashboard");
      }
    } else {
      navigate("/");
    }
  }, [state]);
  //validation Login
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  //theme state
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />
        <Helmet>
          <title></title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sidebar" element={<Sidebar />}>
              <Route path="dashboard" element={<Home theme={theme} />} />
              <Route path="profiles" element={<Profile theme={theme} />} />
              <Route
                path="list"
                element={<ListCategorySuplier theme={theme} />}
              />
              <Route path="log" element={<Logger theme={theme} />} />
              <Route
                path="admin"
                element={
                  isLogins === "superAdmin" ? (
                    <AdminList theme={theme} />
                  ) : (
                    <></>
                  )
                }
              />
              <Route
                path="complain"
                element={
                  isLogins === "superAdmin" ? (
                    <ComponentComplainAdmin theme={theme} />
                  ) : (
                    <ComponentComplain theme={theme} />
                  )
                }
              />
            </Route>
            <Route path="/add" element={<AddList theme={theme} />} />
            <Route path="/editList/:id" element={<EditList theme={theme} />} />
            <Route
              path="/editProfile/:id"
              element={<EditProfile theme={theme} />}
            />
            <Route path="/addProfile" element={<AddProfile theme={theme} />} />
            <Route
              path="/detailFlow/:id"
              element={<DetailFlow theme={theme} />}
            />
          </Routes>
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
