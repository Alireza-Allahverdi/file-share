import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "./pages/auth/signup/Signup.tsx";
import Signin from "./pages/auth/signin/Signin.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/authLayout/AuthLayout.tsx";
import Home from "./pages/home/Home.tsx";
import OptionLayout from "./components/optionLayout/OptionLayout.tsx";
import Account from "./pages/opt/account/Account.tsx";
import Personalization from "./pages/opt/personalization/Personalization.tsx";
import Security from "./pages/opt/security/Security.tsx";
import ServerSetting from "./pages/opt/serverSetting/ServerSetting.tsx";
import Users from "./pages/opt/users/Users.tsx";
import "./index.css";
import Layout from "./components/layout/Layout.tsx";
import Favorite from "./pages/favorite/Favorite.tsx";
import Shared from "./pages/shared/Shared.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
