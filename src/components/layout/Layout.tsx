import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex fle-col w-full bg-surface-container dark:bg-surface-container-dark">
      <div className="py-2 px-8"></div>
      <div className="flex">
        <div className="flex flex-col gap-y-4 p-6"></div>
        <div className="w-full bg-white dark:bg-black rounded-2xl py-6 px-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
