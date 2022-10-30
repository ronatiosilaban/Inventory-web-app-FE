//import module start
import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import { SLayout, SMain } from "../Layout/styles";
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SLogo,
  SSearch,
  SSearchIcon,
  SSidebar,
  SSidebarButton,
  STheme,
  SThemeLabel,
  SThemeToggler,
  SToggleThumb,
} from "./styles";
import Avatar from "@mui/material/Avatar";
import { logoSVG } from "../../assets";

import {
  AiOutlineApartment,
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineHistory,
  AiOutlineMessage,
} from "react-icons/ai";
import { RiFolderUserLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { UserContext } from "../../context/user";
import { useContext } from "react";
import { ThemeContext } from "./../../App";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { PATH_FILE } from "../../IP/ip";
//import module end

const Sidebar = () => {
  const searchRef = useRef(null);
  const { setTheme, theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //router get data
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/getProfiles");
    return response.data.data;
  });

  const { pathname } = useLocation();

  const [_, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  // handle logout action
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  const role = localStorage.role;
  const data = "superAdmin";

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <SSidebar isOpen={sidebarOpen}>
          <>
            <SSidebarButton
              isOpen={sidebarOpen}
              onClick={() => setSidebarOpen((p) => !p)}
            >
              <AiOutlineLeft />
            </SSidebarButton>
          </>
          <SLogo>
            {profile ? (
              <Avatar alt="Remy Sharp" src={PATH_FILE + profile?.image} />
            ) : (
              <Avatar
                alt="Remy Sharp"
                src="https://tse2.mm.bing.net/th?id=OIP.fNwUOL5NcJhKMVoDzfICzQAAAA&pid=Api&P=0"
              />
            )}
            {sidebarOpen && (
              <SLinkLabel>
                <span style={{ paddingLeft: "1vw", fontSize: "25px" }}>
                  Inventory
                </span>
              </SLinkLabel>
            )}
          </SLogo>
          <SDivider />
          {linksArray.map(({ icon, label, notification, to }) => (
            <SLinkContainer key={label} isActive={pathname === to}>
              <SLink
                to={to}
                style={!sidebarOpen ? { width: `fit-content` } : {}}
              >
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && (
                  <>
                    <SLinkLabel>{label}</SLinkLabel>
                    {/* if notifications are at 0 or null, do not display */}
                    {!!notification && (
                      <SLinkNotification>{notification}</SLinkNotification>
                    )}
                  </>
                )}
              </SLink>
            </SLinkContainer>
          ))}
          {role == data ? (
            <div>
              {superAdmin.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                  <SLink
                    to={to}
                    style={!sidebarOpen ? { width: `fit-content` } : {}}
                  >
                    <SLinkIcon>{icon}</SLinkIcon>
                    {sidebarOpen && (
                      <>
                        <SLinkLabel>{label}</SLinkLabel>
                        {/* if notifications are at 0 or null, do not display */}
                        {!!notification && (
                          <SLinkNotification>{notification}</SLinkNotification>
                        )}
                      </>
                    )}
                  </SLink>
                </SLinkContainer>
              ))}
            </div>
          ) : (
            <div>
              {admin.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                  <SLink
                    to={to}
                    style={!sidebarOpen ? { width: `fit-content` } : {}}
                  >
                    <SLinkIcon>{icon}</SLinkIcon>
                    {sidebarOpen && (
                      <>
                        <SLinkLabel>{label}</SLinkLabel>
                        {/* if notifications are at 0 or null, do not display */}
                        {!!notification && (
                          <SLinkNotification>{notification}</SLinkNotification>
                        )}
                      </>
                    )}
                  </SLink>
                </SLinkContainer>
              ))}
            </div>
          )}

          <SDivider />
          {secondaryLinksArray.map(({ icon, label }) => (
            <SLinkContainer key={label}>
              <SLink
                onClick={() => handleLogout()}
                style={!sidebarOpen ? { width: `fit-content` } : {}}
              >
                <SLinkIcon>{icon}</SLinkIcon>
                {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
              </SLink>
            </SLinkContainer>
          ))}
          <SDivider />
          <STheme>
            {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
            <SThemeToggler
              isActive={theme === "dark"}
              onClick={() =>
                setTheme((p) => (p === "light" ? "dark" : "light"))
              }
            >
              <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
            </SThemeToggler>
          </STheme>
        </SSidebar>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/sidebar/dashboard",
    notification: 0,
  },
  {
    label: "Profiles",
    icon: <CgProfile />,
    to: "/sidebar/profiles",
    notification: 0,
  },
  {
    label: "List Suplier & Category",
    icon: <BsPeople />,
    to: "/sidebar/list",
    notification: 0,
  },
  {
    label: "Complain",
    icon: <AiOutlineMessage />,
    to: "/sidebar/complain",
    notification: 0,
  },
  {
    label: "Log",
    icon: <AiOutlineHistory />,
    to: "/sidebar/log",
    notification: 0,
  },
];
const admin = [];

const superAdmin = [
  {
    label: "Admin List",
    icon: <RiFolderUserLine />,
    to: "/sidebar/admin",
    notification: 0,
  },
];
const secondaryLinksArray = [
  // {
  //   label: "Settings",
  //   icon: <AiOutlineSetting />,
  // },
  {
    label: "Logout",
    icon: <MdLogout />,
  },
];

export default Sidebar;
