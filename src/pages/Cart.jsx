import React, { useEffect, useState } from "react";
import UserCartCards from "../components/UserCartCard";
import useProductCalls from "../hooks/useProductCalls";
import useAuthCalls from "../hooks/useAuthCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  fetchEnd,
  fetchStart,
  updateProductCount,
} from "../features/productSlice";
import { toastError } from "../helpers/toastify";
import emptyCart from "../assets/empty-cart.png";
import SkeletonCard from "../components/SkeletonCard";

const Cart = () => {
  const { getAllOrderItems, createOrder } = useProductCalls();
  const { updateProfile } = useAuthCalls();
  const [orderItems, setOrderItems] = useState([]);
  const { address, currentUser, avatar, purse } = useSelector(
    (state) => state.auth
  );
  const { products, loading } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartTotalPrice = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const [orderInfo, setOrderInfo] = useState({
    // user_id: currentUser.id,
    items: null,
    address_id: address?.id,
    ordered: true,
    payment: true,
  });

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(fetchStart());
      await getAllOrderItems(setOrderItems);
      dispatch(fetchEnd());
    };
    fetchItems();
    // setOrderItems(products);
    // eslint-disable-next-line
  }, [products.length]);

  useEffect(() => {
    setOrderInfo({ ...orderInfo, items: orderItems.map((item) => item.id) });
    // eslint-disable-next-line
  }, [orderItems]);

  const handleOrder = async () => {
    const orderTotalPrice = orderItems?.reduce(
      (acc, val) => val.item_total_price + acc,
      0
    );

    if (!currentUser) {
      toastError("Login to Continue");
      return navigate("/login");
    }

    if (orderItems.length === 0) {
      return toastError("You have nothing in your cart");
    }

    if (orderTotalPrice <= purse) {
      updateProfile(currentUser.id, {
        avatar: avatar,
        purse: purse - orderTotalPrice,
      });

      await createOrder(orderInfo);
      setOrderItems([]);
      dispatch(updateProductCount(0));
      navigate("/");
    } else {
      toastError("You don't have enough money in your purse");
    }
  };

  return (
    <div className="pt-10 text-center p-8">
      <p className="font-bold text-2xl mb-4 text-gray-700">Shopping Cart</p>
      {loading
        ? Array.from({ length: 3 }, (v, i) => i).map((el) => (
            <SkeletonCard key={el} props={"cart"} />
          ))
        : currentUser
        ? orderItems?.map((item) => (
            <UserCartCards
              key={item.id}
              item={item}
              setOrderItems={setOrderItems}
            />
          ))
        : products?.map((item) => (
            <UserCartCards
              key={item.id}
              item={item}
              setOrderItems={setOrderItems}
            />
          ))}

      {loading || orderItems.length > 0 ? (
        <p className="font-bold text-lg mt-4">
          <span className="font-normal ">Total : </span>
          {currentUser
            ? orderItems?.reduce((acc, val) => val.item_total_price + acc, 0)
            : cartTotalPrice}
          $
        </p>
      ) : (
        <img className="m-auto" src={emptyCart} alt="" />
      )}

      <div>
        <div className="my-4">
          {address ? (
            <>
              <h4 className="text-xl font-semibold mb-3">Order Address :</h4>
              <div className="w-[20rem] sm:w-[24rem] m-auto text-left">
                <p className="font-bold border-gray-400 border border-b-0 p-2 pl-4">
                  Adress :{" "}
                  <span className="font-normal italic">{address?.address}</span>
                </p>
                <p className="font-bold border-gray-400 border border-b-0 p-2 pl-4">
                  City :{" "}
                  <span className="font-normal italic ">{address?.city}</span>
                </p>
                <p className="font-bold border-gray-400 border p-2 pl-4">
                  Country :{" "}
                  <span className="font-normal italic">{address?.country}</span>
                </p>
              </div>
            </>
          ) : (
            <button
              className="text-white bg-gray-800 hover:bg-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all my-3"
              onClick={() => navigate("/profile")}
            >
              Add Address
            </button>
          )}
        </div>

        <button
          className="text-white bg-primary hover:bg-indigo-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
          // disabled={orderItems.length < 1 && true}
          onClick={handleOrder}
        >
          ORDER
        </button>
      </div>
    </div>
  );
};

export default Cart;
