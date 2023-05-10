import React, { useEffect, useState } from "react";
import defaultProduct from "../assets/defaultProduct.png";
import useProductCalls from "../hooks/useProductCalls";

const UserOrderCards = ({ item, setOrderItems }) => {
  const { updateOrderItems, deleteOrderItems } = useProductCalls();
  const [product, setProduct] = useState(item);

  const decreaseQuantity = () => {
    updateOrderItems(
      product.id,
      { quantity: product.quantity - 1 },
      setProduct,
      setOrderItems
    );
  };

  const increaseQuantity = () => {
    updateOrderItems(
      product.id,
      { quantity: product.quantity + 1 },
      setProduct,
      setOrderItems
    );
  };

  // console.log(product);

  return (
    <>
      {product.quantity > 0 && (
        <div className=" flex justify-between items-center mb-2 px-8 border-2 rounded-xl">
          <div className="flex justify-center items-center p-4">
            <div className="flex justify-center items-center">
              <img
                className="rounded-full w-20 h-20 m-auto object-contain"
                src={product?.item.image || defaultProduct}
                alt="product"
              />
            </div>

            <div className="flex flex-col justify-center items-center ml-6">
              <p className="font-semibold">{product.item.title}</p>
              <p>{product.item.description}</p>
            </div>
          </div>

          <div className="flex gap-8">
            {/* <p className="font-bold">{product.item_total_price}$</p> */}
            <p className="font-bold">{product.item_total_price}$</p>

            <div className="flex justify-center items-center gap-4 border-2 border-gray-600 rounded-2xl px-2">
              <i
                className="fa-solid fa-minus hover:text-red-600 hover:scale-110 transition-all active:scale-90"
                onClick={decreaseQuantity}
              ></i>

              {product.quantity}

              <i
                className="fa-solid fa-plus hover:text-green-600 hover:scale-110 transition-all active:scale-90"
                onClick={increaseQuantity}
              ></i>
            </div>
            <div>
              <i
                className="fa-solid fa-trash-can text-red-500 cursor-pointer hover:text-red-900"
                onClick={() => deleteOrderItems(product.id, setOrderItems)}
              ></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrderCards;
