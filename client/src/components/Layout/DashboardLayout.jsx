import { Outlet } from "react-router-dom";
import Header from "../Header";

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
