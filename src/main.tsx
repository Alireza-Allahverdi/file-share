import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "./pages/auth/signup/Signup.tsx";
import Signin from "./pages/auth/signin/Signin.tsx";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import AuthLayout from "./components/authLayout/AuthLayout.tsx";
import Layout from "./components/layout/Layout.tsx";
import Account from "./pages/opt/account/Account.tsx";
import Personalization from "./pages/opt/personalization/Personalization.tsx";
import Security from "./pages/opt/security/Security.tsx";
import ServerSetting from "./pages/opt/serverSetting/ServerSetting.tsx";
import Users from "./pages/opt/users/Users.tsx";

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
    ],
  },
  {
    path: "/opt",
    element: <Layout />,
    children: [
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "security",
        element: <Security />,
      },
      {
        path: "personalization",
        element: <Personalization />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "server",
        element: <ServerSetting />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
