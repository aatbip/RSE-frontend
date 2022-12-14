import { useRoutes } from "react-router-dom";

import Homepage from "./components/Homepage/Homepage";
import HotelDetail from "./components/HotelDetail/HotelDetail";
import HotelManage from "./components/HotelManagePage/HotelManage";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Layout from "./layout/Layout";
import Admin from "./components/Admin/admin";
import AdminHome from "./components/Admin/adminHome";

export default function Router() {
  return useRoutes([
    {
      element: <Layout />,
      children: [
        { path: "", element: <Homepage /> },
        { path: "login", element: <Login /> },
        { path: "registration", element: <Registration /> },
        { path: "manage-hotel", element: <HotelManage /> },
        { path: "hotel-detail/:id", element: <HotelDetail /> },
        { path: "admin", element: <Admin /> },
        { path: "admin-home", element: <AdminHome /> },
      ],
    },
  ]);
}
