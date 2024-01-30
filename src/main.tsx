import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./components/authLayout/AuthLayout.tsx";
import Layout from "./components/layout/Layout.tsx";
import OptionLayout from "./components/optionLayout/OptionLayout.tsx";
import "./index.css";
import Signin from "./pages/auth/signin/Signin.tsx";
import Signup from "./pages/auth/signup/Signup.tsx";
import CustomLink from "./pages/customLink/CustomLink.tsx";
import Favorite from "./pages/favorite/Favorite.tsx";
import Folders from "./pages/folders/Folders.tsx";
import Home from "./pages/home/Home.tsx";
import Account from "./pages/opt/account/Account.tsx";
import Personalization from "./pages/opt/personalization/Personalization.tsx";
import Security from "./pages/opt/security/Security.tsx";
import ServerSetting from "./pages/opt/serverSetting/ServerSetting.tsx";
import Users from "./pages/opt/users/Users.tsx";
import Shared from "./pages/shared/Shared.tsx";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  localStorage.theme = "dark";
} else {
  document.documentElement.classList.remove("dark");
  localStorage.theme = "light";
}

if (!!localStorage.getItem("font")) {
  switch (localStorage.getItem("font")) {
    case "verySmall":
      document.documentElement.style.setProperty("--base-font-size", "12px");
      break;
    case "small":
      document.documentElement.style.setProperty("--base-font-size", "14px");
      break;
    case "medium":
      document.documentElement.style.setProperty("--base-font-size", "16px");
      break;
    case "large":
      document.documentElement.style.setProperty("--base-font-size", "18px");
      break;
    case "veryLarge":
      document.documentElement.style.setProperty("--base-font-size", "20px");
      break;
    default:
      break;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "folders/:id",
        element: <Folders />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "shared",
        element: <Shared />,
      },
    ],
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
    element: <OptionLayout />,
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
  {
    path: "/customlink/:id",
    element: <CustomLink />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer position="bottom-right" theme="colored" closeOnClick />
    <RouterProvider router={router} />
  </React.StrictMode>
);
