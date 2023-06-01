import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import useProductCalls from "../hooks/useProductCalls";
import ProductCard from "../components/ProductCard";
import headerImage from "../assets/ecommerce-img.jpg";
import SkeletonCard from "../components/SkeletonCard";

const Dashboard = ({ items, setItems }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.product);
  const { getProfile, getAddress } = useAuthCalls();
  const { getAllItems, productsAddOrderItems } = useProductCalls();

  useEffect(() => {
    currentUser && getProfile(currentUser?.id);
    currentUser && productsAddOrderItems();
    getAllItems(setItems);
    currentUser && getAddress();
    // eslint-disable-next-line
  }, []);
  console.log(loading);

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
        {loading
          ? Array.from({ length: 6 }, (v, i) => i).map((el) => (
              <SkeletonCard key={el} props={"product"} />
            ))
          : // <div>loading</div>

            items?.map((item) => <ProductCard key={item?.id} item={item} />)}
      </div>
    </div>
  );
};

export default Dashboard;
