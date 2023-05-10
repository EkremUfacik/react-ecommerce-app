import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileUpdateModal from "../components/ProfileUpdateModal";
import defaultAvatar from "../assets/defaultAvatar.png";
import useAuthCalls from "../hooks/useAuthCalls";
import useProductCalls from "../hooks/useProductCalls";
import OrderCard from "../components/OrderCard";

const Profile = () => {
  const { getAddress, updateAddress, postAddress } = useAuthCalls();
  const { getOrders } = useProductCalls();
  const { currentUser, avatar, purse, address } = useSelector(
    (state) => state.auth
  );
  const [showModal, setShowModal] = useState(false);
  const [toggleAddress, setToggleAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState(address || "");
  const [allOrders, setAllOrders] = useState("");

  console.log(allOrders);

  useEffect(() => {
    currentUser.id && getAddress();
    getOrders(setAllOrders);
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    setToggleAddress(!toggleAddress);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddressInfo({ ...addressInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address) {
      updateAddress(addressInfo);
    } else {
      postAddress(addressInfo);
    }

    setToggleAddress(!toggleAddress);
  };

  return (
    <div className="text-center">
      <div className="p-20 flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[250px]"
            src={avatar || defaultAvatar}
            alt="avatar"
          />

          <h1 className="text-2xl">
            {currentUser.first_name} {currentUser.last_name}
          </h1>
          <p className="text-lg">{purse}$</p>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
            onClick={() => setShowModal(true)}
          >
            UPDATE
          </button>
          {showModal && <ProfileUpdateModal setShowModal={setShowModal} />}
        </div>

        <div className="flex flex-col justify-center items-center"></div>
        {allOrders ? (
          allOrders?.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <p>You have no orders yet!</p>
        )}
      </div>

      <form className="p-4" onSubmit={handleSubmit}>
        <p className="font-bold text-gray-600">My Address</p>

        {toggleAddress ? (
          <>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              type="text"
              name="address"
              value={addressInfo?.address || ""}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              type="text"
              name="city"
              value={addressInfo?.city || ""}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              type="text"
              name="country"
              value={addressInfo?.country || ""}
              onChange={handleChange}
              placeholder="Country"
            />
          </>
        ) : (
          <>
            <p>{addressInfo?.address}</p>
            <p>{addressInfo?.city}</p>
            <p>{addressInfo?.country}</p>
          </>
        )}

        {toggleAddress ? (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
            type="submit"
          >
            {address ? "Update" : "Save"}
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
            type="button"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
