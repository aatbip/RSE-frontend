import React from "react";
import Header from "./Header"; 
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./css/style.css"; 

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
