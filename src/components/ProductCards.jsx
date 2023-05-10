import React from "react";
import defaultProduct from "../assets/defaultProduct.png";
import useProductCalls from "../hooks/useProductCalls";

const ProductCards = ({ item }) => {
  const { addOrderItem, getAllOrderItems } = useProductCalls();

  const addCart = async () => {
    await addOrderItem({
      item_id: item?.id,
      quantity: 1,
    });
    getAllOrderItems();
  };

  return (
    <div className="max-w-sm bg-white border border-gray-400 rounded-lg shadow-xl w-[350px] h-[550px] p-2 cursor-pointer hover:scale-105 transition-all text-center">
      <img
        className="rounded-t-lg w-[300px] h-[350px] m-auto object-contain"
        src={item?.image || defaultProduct}
        alt="product"
      />

      <div className="p-2 flex flex-col justify-end">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {item.title}
          </h5>

          <p className="mb-3 font-normal text-gray-700 ">{item.description}</p>
          <p className="mb-3 font-normal text-gray-700 ">
            <span className="font-medium text-gray-900">Price: </span>
            {item.price}$
          </p>
        </div>

        <div>
          <button
            className="inline-flex justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            onClick={() => addCart()}
          >
            Add Cart
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
