import React from "react";
import ReactDOM from "react-dom/client";
import Signup from "./pages/auth/Signup.tsx";
import Signin from "./pages/auth/Signin.tsx";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/auth",
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
