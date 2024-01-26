import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import IconButtonC from "../iconButton/IconButtonC";
import MenuItemC from "../menuItem/MenuItemC";
import ModalC from "../modal/ModalC";
import { ThemeProvider } from "@emotion/react";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, createTheme } from "@mui/material";
import ButtonC from "../button/ButtonC";
import { WebsiteIcon } from "../../assets";
import {
  MdOutlineDashboardCustomize,
  MdOutlineGroup,
  MdOutlineHome,
  MdOutlineInfo,
  MdOutlineShield,
} from "react-icons/md";
import { FaGithub, FaRegUser } from "react-icons/fa6";
import { FiServer } from "react-icons/fi";

function OptionLayout() {

  const location = useLocation()
  const navigate = useNavigate()

  const [aboutModalState, setAboutModalState] = useState<boolean>(false);

  const theme = createTheme({
    palette: {
      mode: localStorage.theme,
    },
  });

  const options = [
    {
      label: "Account Info",
      icon: <FaRegUser size={24} />,
      link: "account",
    },
    {
      label: "Security",
      icon: <MdOutlineShield size={24} />,
      link: "security",
    },
    {
      label: "Personalization",
      icon: <MdOutlineDashboardCustomize size={24} />,
      link: "personalization",
    },
    {
      label: "Users",
      icon: <MdOutlineGroup size={24} />,
      link: "users",
    },
    {
      label: "Server Settings",
      icon: <FiServer size={24} />,
      link: "server",
    },
  ];  

  return (
    <div className="flex flex-col w-full h-screen px-2 bg-surface-container dark:bg-surface-container-dark">
      <div className="flex justify-end py-2 px-8 gap-x-2">
        <div className="flex items-center gap-x-2 mr-auto">
          <img src={WebsiteIcon.default} alt="" />
          <span className="text-3xl text-on-surface dark:text-on-surface-dark">IE Project</span>
        </div>
        <IconButtonC icon={<MdOutlineInfo size={24} />} onClick={() => setAboutModalState(true)} />
        <IconButtonC icon={<MdOutlineHome size={24} />} onClick={() => navigate("/")} />
      </div>
      <div className="flex justify-between h-full py-2">
        <div className="flex flex-col flex-[0.2] gap-y-4 p-6">
          {options.map((item) => (
            <Link to={item.link}>
              <MenuItemC
                label={item.label}
                icon={item.icon}
                selected={
                  location.pathname.split("/")[
                    location.pathname.split("/").length - 1
                  ] === item.link
                }
              />
            </Link>
          ))}
        </div>
        <div className="flex-[0.8] bg-on-primary dark:bg-on-primary-dark rounded-2xl py-6 px-14 shadow-[#0000004D] shadow-sm">
          <Outlet />
        </div>
      </div>
      <ModalC
        title="About app"
        open={aboutModalState}
        handleClose={() => setAboutModalState(false)}
      >
        <div className="flex flex-col gap-y-6">
          <span className="text-on-surface dark:text-on-surface-dark">
            This project was developed by:
          </span>
          <ThemeProvider theme={theme}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#f8a432" }}>M</Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-on-surface dark:text-on-surface-dark"
                  primary="M. M. Hejazi"
                  secondary="Project Manager"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#f8a432" }}>A</Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-on-surface dark:text-on-surface-dark"
                  primary="A. Allahverdi"
                  secondary="Front-end Developer"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#f8a432" }}>N</Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-on-surface dark:text-on-surface-dark"
                  primary="N. Zamani"
                  secondary="Back-end Developer"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#f8a432" }}>M</Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="text-on-surface dark:text-on-surface-dark"
                  primary="M. Noravari"
                  secondary="UI Designer"
                />
              </ListItem>
            </List>
          </ThemeProvider>
          <div className="text-end">
            <ButtonC
              title="Open in github"
              type="contained"
              icon={<FaGithub size={20} />}
              onCLick={() => {}}
            />
          </div>
        </div>
      </ModalC>
    </div>
  );
}

export default OptionLayout;
