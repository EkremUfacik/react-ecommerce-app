import React, { useState } from "react";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";

const ProfileUpdateModal = ({ setShowModal }) => {
  const { avatar, purse, currentUser } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState({ avatar, purse });
  const { updateProfile } = useAuthCalls();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = () => {
    updateProfile(currentUser?.id, profileData);
    setProfileData({ avatar, purse });
    setShowModal(false);
  };

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-2"
        onClick={() => setShowModal(false)}
      >
        <div
          className="rounded-lg shadow-lg relative flex flex-col p-6 bg-white w-[20rem]"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <label
              htmlFor="purse"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Purse
            </label>
            <input
              type="text"
              id="purse"
              name="purse"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Amount"
              required
              value={profileData.purse || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-900 dark:text-white mt-2"
            >
              Your Avatar
            </label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
              placeholder="Avatar Url"
              required
              value={profileData.avatar || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border border-red-200 rounded shadow hover:shadow-lg hover:bg-red-50"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-emerald-600"
              type="button"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ProfileUpdateModal;
