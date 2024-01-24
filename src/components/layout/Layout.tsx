import { Link, Outlet, useLocation } from "react-router-dom";
import IconButtonC from "../iconButton/IconButtonC";
import MenuItemC from "../menuItem/MenuItemC";
import {
  MdOutlineDashboardCustomize,
  MdOutlineGroup,
  MdOutlineHome,
  MdOutlineInfo,
  MdOutlineShield,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FiServer } from "react-icons/fi";

function Layout() {

  const location = useLocation()

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
        <IconButtonC icon={<MdOutlineInfo size={24} />} onClick={() => {}} />
        <IconButtonC icon={<MdOutlineHome size={24} />} onClick={() => {}} />
      </div>
      <div className="flex justify-between">
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
        <div className="flex-[0.8] h-[100vh] bg-on-primary dark:bg-on-primary-dark rounded-2xl py-6 px-14 shadow-[#0000004D] shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
