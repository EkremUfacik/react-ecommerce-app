import React, { useEffect, useState } from "react";
import defaultProduct from "../assets/defaultProduct.png";
import useProductCalls from "../hooks/useProductCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseProduct,
  increaseProduct,
  removeProduct,
} from "../features/productSlice";

const UserCartCards = ({ item, setOrderItems }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { updateOrderItems, deleteOrderItems } = useProductCalls();
  const [product, setProduct] = useState(item);
  const dispatch = useDispatch();

  useEffect(() => {
    currentUser ||
      setProduct({
        item: { ...item },
        quantity: item.quantity,
        item_total_price: item.quantity * item.price,
      });
    item.quantity === 0 && dispatch(removeProduct(product.item.id));
    // eslint-disable-next-line
  }, [item.quantity]);

  const decreaseQuantity = () => {
    if (currentUser) {
      updateOrderItems(
        product.id,
        { quantity: product.quantity - 1 },
        setProduct,
        setOrderItems
      );
    } else {
      dispatch(decreaseProduct(product.item.id));
    }
  };

  const increaseQuantity = () => {
    if (currentUser) {
      updateOrderItems(
        product.id,
        { quantity: product.quantity + 1 },
        setProduct,
        setOrderItems
      );
    } else {
      dispatch(increaseProduct(product.item.id));
    }
  };

  const handleDelete = () => {
    if (currentUser) {
      deleteOrderItems(product.id, setOrderItems);
    } else {
      dispatch(removeProduct(product.item.id));
    }
  };

  return (
    <>
      {product.quantity > 0 && (
        <div className="flex justify-between items-center border-b-2 w-full lg:w-4/5 m-auto md:flex-row flex-col gap-4">
          <div className="flex justify-center items-center self-start p-2">
            <div className="flex-shrink-0">
              <img
                className=" w-[120px] h-[140px] object-contain"
                src={product?.item?.image || defaultProduct}
                alt="product"
              />
            </div>

            <div className="flex flex-col justify-center items-start ml-6">
              <p className="font-semibold text-lg">{product.item?.title}</p>
              <p className="text-left font-thin text-gray-600">
                {product.item?.description}
              </p>
            </div>
          </div>

          <div className="flex gap-8 justify-center items-center mb-2">
            {/* <p className="font-bold">{product.item_total_price}$</p> */}
            <p className="font-bold text-lg">{product.item_total_price}$</p>

            <div className="flex justify-center items-center gap-4 bg-sky-50 rounded-2xl px-4 py-1 text-lg text-gray-600">
              <i
                className="fa-solid fa-minus text-sm text-gray-500 hover:text-red-600 hover:scale-110 transition-all active:scale-75 cursor-pointer "
                onClick={decreaseQuantity}
              ></i>

              {product.quantity}

              <i
                className="fa-solid fa-plus hover:text-green-600 hover:scale-110 transition-all active:scale-75 cursor-pointer text-gray-500 text-sm"
                onClick={increaseQuantity}
              ></i>
            </div>
            <div>
              <i
                className="fa-solid fa-trash-can text-red-400 cursor-pointer hover:text-red-500 bg-red-100 p-2 rounded-full"
                onClick={handleDelete}
              ></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCartCards;
