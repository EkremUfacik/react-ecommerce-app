import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { toastError } from "../helpers/toastify";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);

  currentUser || toastError("Login to Continue");

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
