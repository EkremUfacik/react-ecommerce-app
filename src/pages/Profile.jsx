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
    // eslint-disable-next-line
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
      <div className="flex flex-col justify-around items-center mt-8 gap-8 lg:flex-row">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[250px]"
            src={avatar || defaultAvatar}
            alt="avatar"
          />

          <h1 className="text-2xl mt-3 font-serif">
            {currentUser.first_name.toUpperCase()}{" "}
            {currentUser.last_name.toUpperCase()}
          </h1>
          <p className="text-xl my-2 font-serif">{purse ? purse : 0} $</p>

          <button
            type="button"
            className="text-white font-medium rounded-lg text-md bg-primary hover:bg-indigo-900 px-5 py-2.5 text-center mt-2"
            onClick={() => setShowModal(true)}
          >
            Update
          </button>
          {showModal && <ProfileUpdateModal setShowModal={setShowModal} />}
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center gap-4">
          {allOrders.length ? (
            allOrders?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <p className="font-bold font-serif text-gray-600 text-xl mb-10">
              You have no orders yet!
            </p>
          )}
        </div>
      </div>

      <form className="pb-10" onSubmit={handleSubmit}>
        <p className="font-bold font-serif text-gray-600 text-xl my-4">
          My Address
        </p>

        {toggleAddress ? (
          <div className="flex flex-col items-center justify-center w-[20rem] sm:w-[30rem] m-auto gap-1">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block p-2.5 w-full"
              type="text"
              name="address"
              value={addressInfo?.address || ""}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block p-2.5 w-full"
              type="text"
              name="city"
              value={addressInfo?.city || ""}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block p-2.5 w-full mb-4"
              type="text"
              name="country"
              value={addressInfo?.country || ""}
              onChange={handleChange}
              placeholder="Country"
              required
            />
          </div>
        ) : (
          <>
            <p className="text-lg mb-1 font-bold">{addressInfo?.address}</p>
            <p className="text-lg mb-1 font-bold">{addressInfo?.city}</p>
            <p className="text-lg mb-3 font-bold">{addressInfo?.country}</p>
          </>
        )}

        {toggleAddress ? (
          <div>
            <button
              className="text-primary font-medium rounded-lg text-sm border border-primary hover:bg-indigo-50 px-5 py-2.5 text-center mr-4"
              type="submit"
              onClick={() => setToggleAddress(false)}
            >
              Cancel
            </button>

            <button
              className="text-white font-medium rounded-lg text-sm bg-primary hover:bg-indigo-900 px-5 py-2.5 text-center"
              type="submit"
            >
              {address ? "Update" : "Save"}
            </button>
          </div>
        ) : (
          <button
            className="text-white font-medium rounded-lg text-md bg-primary hover:bg-indigo-900 px-5 py-2.5 text-center"
            type="button"
            onClick={handleEdit}
          >
            {address ? "Edit" : "Add"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
