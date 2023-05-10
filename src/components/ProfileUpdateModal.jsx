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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-2">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-2">
            <div>
              <label
                htmlFor="purse"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
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
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
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
            <div className="flex justify-end">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ProfileUpdateModal;
