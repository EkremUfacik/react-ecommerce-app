import React, { useState } from "react";
import useAuthCalls from "../hooks/useAuthCalls";
import usePasswordToggle from "./usePasswordToggle";

function Login() {
  const { login } = useAuthCalls();
  const [userInfo, setUserInfo] = useState({
    email: "ee@ee.com",
    password: "Ee123456.",
  });
  const [passwordInputType, toggleIcon] = usePasswordToggle();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userInfo);
  };

  return (
    // <div className=" w-[28rem] p-10 m-auto">
    <form
      className=" sm:w-[28rem] w-[25rem] p-10 m-auto bg-white border border-gray-300 border-t-0"
      onSubmit={handleSubmit}
    >
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block w-full p-2.5 "
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
          type={passwordInputType}
          id="password"
          name="password"
          value={userInfo.password || ""}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-zinc-400 outline-none block w-full p-2.5 "
          placeholder="•••••••••"
          required
        />
        <div className="absolute right-4 bottom-3 cursor-pointer">
          {toggleIcon}
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-primary hover:bg-indigo-900 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
      >
        Login
      </button>
    </form>
    // </div>
  );
}

export default Login;
