import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-surface-container dark:bg-surface-container-dark">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
