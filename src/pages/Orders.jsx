import React, { useEffect, useState } from "react";
import UserCartCards from "../components/UserCartCard";
import useProductCalls from "../hooks/useProductCalls";
import useAuthCalls from "../hooks/useAuthCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateProductCount } from "../features/productSlice";
import { toastError } from "../helpers/toastify";
import emptyCart from "../assets/empty-cart.png";

const Orders = () => {
  const { getAllOrderItems, createOrder } = useProductCalls();
  const { updateProfile } = useAuthCalls();
  const [orderItems, setOrderItems] = useState([]);
  const { address, currentUser, avatar, purse } = useSelector(
    (state) => state.auth
  );
  const { products } = useSelector((state) => state.product);
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
    getAllOrderItems(setOrderItems);
    // setOrderItems(products);
  }, [products.length]);

  useEffect(() => {
    setOrderInfo({ ...orderInfo, items: orderItems.map((item) => item.id) });
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
    <div className="pt-20 text-center p-8">
      <p className="font-bold text-2xl mb-4 text-gray-700">My Cart</p>

      {currentUser
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

      {orderItems.length > 0 ? (
        <p className="font-bold text-lg">
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
        <div className="mb-2">
          {address ? (
            <>
              <h4 className="text-xl font-semibold">Order Address :</h4>
              <div>
                <p>
                  Adress : <span>{address?.address}</span>
                </p>
                <p>
                  City : <span>{address?.city}</span>
                </p>
                <p>
                  Country : <span>{address?.country}</span>
                </p>
              </div>
            </>
          ) : (
            <button
              className="text-white bg-[rgb(31,41,55)] hover:bg-darkGray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all my-3"
              onClick={() => navigate("/profile")}
            >
              Add Address
            </button>
          )}
        </div>

        <button
          className="text-white bg-[rgb(31,41,55)] hover:bg-darkGray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all"
          // disabled={orderItems.length < 1 && true}
          onClick={handleOrder}
        >
          ORDER
        </button>
      </div>
    </div>
  );
};

export default Orders;
