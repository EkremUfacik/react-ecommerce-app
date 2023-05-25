import React, { useEffect, useState } from "react";
import defaultProduct from "../assets/defaultProduct.png";
import useProductCalls from "../hooks/useProductCalls";
import { useSelector } from "react-redux";
import { BsCartCheck } from "react-icons/bs";
import { BiCartAdd } from "react-icons/bi";

const ProductCards = ({ item }) => {
  const { addOrderItem, getAllOrderItems } = useProductCalls();
  const { products } = useSelector((state) => state.product);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getAllOrderItems();
  }, [products.length]);

  const addCart = async () => {
    await addOrderItem({
      ...item,
      quantity: 1,
    });
  };

  const handleClick = () => {
    setAdded(true);
    addCart();
    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <div className="max-w-sm bg-white border-2 border-gray-200 rounded-lg shadow-md w-[250px] h-[420px] p-2 cursor-pointer hover:shadow-2xl hover:border-none transition-all text-center">
      <img
        className="rounded-t-lg w-[220px] h-[220px] m-auto object-contain"
        src={item?.image || defaultProduct}
        alt="product"
      />

      <div className="p-2 flex flex-col justify-end text-left">
        <div className="">
          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 ">
            {item.title}
          </h5>

          <p className=" font-normal text-gray-700 truncate ...">
            {item.description}
          </p>
        </div>

        {/* <div className=""> */}
        <p className=" font-bold text-gray-700 my-2 text-lg ">{item.price}$</p>
        {added ? (
          <button className="inline-flex justify-center items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg  ">
            <BsCartCheck size={20} />
            Added to Cart!
          </button>
        ) : (
          <button
            className="inline-flex justify-center items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 "
            onClick={handleClick}
          >
            <BiCartAdd size={20} />
            Add Cart
          </button>
        )}
      </div>
    </div>
    // </div>
  );
};

export default ProductCards;
