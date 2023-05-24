import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthCalls from "../hooks/useAuthCalls";
import usePasswordToggle1, { usePasswordToggle2 } from "./usePasswordToggle";

function Register() {
  const { register } = useAuthCalls();
  const [userInfo, setUserInfo] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [passwordInputType1, toggleIcon1] = usePasswordToggle1();
  const [passwordInputType2, toggleIcon2] = usePasswordToggle2();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(userInfo);
  };

  return (
    <form
      className="bg-white p-10 border border-gray-300 border-t-0"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={userInfo?.first_name || ""}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:border-zinc-400 outline-none"
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={userInfo.last_name || ""}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block w-full p-2.5 "
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          User Name
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={userInfo?.username || ""}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block w-full p-2.5 "
          placeholder="Username"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userInfo.email || ""}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block w-full p-2.5"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-6 relative">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type={passwordInputType1}
          id="password"
          name="password"
          value={userInfo.password || ""}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block w-full p-2.5 "
          placeholder="Password"
          required
        />
        <div className="absolute right-4 bottom-3 cursor-pointer">
          {toggleIcon1}
        </div>
      </div>
      <div className="mb-6 relative">
        <label
          htmlFor="confirm_password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type={passwordInputType2}
          id="confirm_password"
          name="password2"
          value={userInfo.password2 || ""}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block w-full p-2.5"
          placeholder="Password Again"
          required
        />
        <div className="absolute right-4 bottom-3 cursor-pointer">
          {toggleIcon2}
        </div>
      </div>

      <button
        type="submit"
        className="text-white font-medium rounded-lg text-sm w-full bg-primary hover:opacity-95 px-5 py-2.5 text-center "
      >
        Register
      </button>
    </form>
  );
}

export default Register;
