import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import IconButtonC from "../iconButton/IconButtonC";
import MenuItemC from "../menuItem/MenuItemC";
import ButtonC from "../button/ButtonC";
import { MdOutlineFileUpload, MdOutlineHome, MdOutlineInfo, MdOutlinePeopleAlt, MdOutlineSettings, MdOutlineStarOutline } from "react-icons/md";

const Layout = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const options = [
    {
      label: "Home",
      icon: <MdOutlineHome size={24} />,
      link: "",
    },
    {
      label: "Shared with me",
      icon: <MdOutlinePeopleAlt size={24} />,
      link: "shared",
    },
    {
      label: "Favorites",
      icon: <MdOutlineStarOutline size={24} />,
      link: "favorite",
    },
  ];  


  return (
    <div className="flex flex-col w-full h-screen px-2 bg-surface-container dark:bg-surface-container-dark">
      <div className="flex justify-end py-2 px-8 gap-x-2">
        <IconButtonC icon={<MdOutlineInfo size={24} />} onClick={() => {}} />
        <IconButtonC icon={<MdOutlineSettings size={24} />} onClick={() => navigate("/opt/account")} />
      </div>
      <div className="flex justify-between h-full py-2">
        <div className="flex flex-col flex-[0.2] gap-y-4 p-6">
          <ButtonC
          className="w-max"
          title="Upload"
          type="contained"
          icon={<MdOutlineFileUpload size={20} />}
          />
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
    </div>
  )
}

export default Layout