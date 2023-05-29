import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import useProductCalls from "../hooks/useProductCalls";
import ProductCards from "../components/ProductCards";
import headerImage from "../assets/ecommerce-img.jpg";

const Dashboard = ({ items, setItems }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { getProfile, getAddress } = useAuthCalls();
  const { getAllItems, getAllOrderItems, productsAddOrderItems } =
    useProductCalls();

  useEffect(() => {
    currentUser && getProfile(currentUser?.id);
    currentUser && productsAddOrderItems();
    getAllItems(setItems);
    getAllOrderItems();
    currentUser && getAddress();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="pb-16">
      <div className="p-4 bg-gradient-to-b from-sky-900">
        {/* <h1 className="text-4xl p-8">E-Commerce by {"<HMZAYGN/>"}</h1> */}
        <img
          src={headerImage}
          alt="header"
          className="w-full max-w-3xl h-[450px] m-auto mb-4 rounded-xl shadow-xl"
        />
      </div>

      <div className="flex gap-3 justify-center items-center flex-wrap">
        {items?.map((item) => (
          <ProductCards key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
