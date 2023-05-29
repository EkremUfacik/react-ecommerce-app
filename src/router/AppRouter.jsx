import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NavBar from "../components/NavBar";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import LogRes from "../pages/LogReg";
import ProductDetail from "../pages/ProductDetail";

const Approuter = () => {
  const [items, setItems] = useState([]);
  return (
    <BrowserRouter>
      <NavBar setItems={setItems} />
      <Routes>
        <Route
          index
          element={<Dashboard items={items} setItems={setItems} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogRes />} />
        <Route path="/profile" element={<PrivateRouter />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/orders" element={<Orders />} />
        <Route path="/detail:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Approuter;
