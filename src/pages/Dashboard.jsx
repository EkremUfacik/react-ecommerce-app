import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import useProductCalls from "../hooks/useProductCalls";
import ProductCards from "../components/ProductCards";
import headerImage from "../assets/ecommerce.jpg";

const Dashboard = ({ items, setItems }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { getProfile } = useAuthCalls();
  const { getAllItems } = useProductCalls();
  // const [items, setItems] = useState([]);

  useEffect(() => {
    currentUser && getProfile(currentUser?.id);
    getAllItems(setItems);
    // console.log("dashboard");
  }, []);

  return (
    <div className="pt-16 ">
      <div className="text-center">
        <h1 className="text-4xl p-8">E-Commerce by {"<HMZAYGN/>"}</h1>
        <img
          src={headerImage}
          alt="header"
          className="rounded-full w-80 h-68 m-auto mb-4"
        />
      </div>

      <div className="flex gap-3 justify-center items-center">
        {items?.map((item) => (
          <ProductCards key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
