import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Landing from "./pages/landing/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import AuthLayout from "./layoutes/AuthLayout";
import DetailPage from "./pages/DetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "home",
    element: <App />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path:":id",
        element:<DetailPage/>
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
export default router;
