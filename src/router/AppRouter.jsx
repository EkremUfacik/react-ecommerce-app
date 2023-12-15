import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NavBar from "../components/NavBar";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/Profile";
import LogRes from "../pages/LogReg";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

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
        <Route path="/login" element={<LogRes />} />
        <Route path="/profile" element={<PrivateRouter />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/orders" element={<Cart />} />
        <Route path="/detail:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Approuter;
