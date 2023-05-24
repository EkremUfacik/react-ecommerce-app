import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import navbarImage from "../assets/navbarImage.png";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import defaultAvatar from "../assets/defaultAvatar.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useProductCalls from "../hooks/useProductCalls";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ setItems }) {
  const { currentUser, avatar, purse } = useSelector((state) => state.auth);
  const { productCount } = useSelector((state) => state.product);
  const [search, setSearch] = useState("");
  const [navChange, setNavChange] = useState(false);
  const { logout } = useAuthCalls();
  const navigate = useNavigate();
  const { getSearchedItems, getAllItems } = useProductCalls();

  const changeNavBg = () => {
    window.scrollY > 50 ? setNavChange(true) : setNavChange(false);
  };

  console.log(navChange);

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);

    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getSearchedItems(search, setItems);
    setSearch("");
  };

  const handleNavigate = () => {
    navigate("/");
    getAllItems(setItems);
  };

  return (
    <Disclosure
      as="nav"
      className={`${
        navChange
          ? "bg-transparent backdrop-blur-lg"
          : "bg-slate-800 shadow-slate-700 "
      } sticky top-0 w-full transition-all shadow-md z-10 `}
    >
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"> */}
            <div
              className="flex items-center cursor-pointer"
              onClick={handleNavigate}
            >
              <img
                className="block h-10 w-10 rounded-full drop-shadow-xl"
                src={navbarImage}
                alt="Your Company"
              />
            </div>

            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-md mx-auto px-4 "
            >
              {/* <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-white sr-only"
              >
                Search
              </label> */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-100 border border-gray-300 rounded-lg bg-gray-900 border-none focus:outline-none placeholder:text-gray-200 shadow shadow-gray-500"
                  placeholder="Search"
                  required
                  value={search || ""}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-darkGray hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </form>
            {/* </div> */}
            <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative w-8 h-8 flex justify-center items-center bg-gray-800 p-4 text-gray-400 hover:text-white
                border-2 border-gray-500 focus:outline-none "
                onClick={() => navigate("/orders")}
              >
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
                <p className="absolute -top-2 -right-3 rounded-full w-5 h-5 flex items-center justify-center text-white bg-sky-800">
                  {productCount}
                </p>
              </button>

              {currentUser &&
                (purse ? (
                  <p className=" text-gray-400 px-2">{purse}$</p>
                ) : (
                  <p className=" text-gray-400 px-2">0$</p>
                ))}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={avatar || defaultAvatar}
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Admin Panel
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Dashboard
                        </Link>
                      )}
                    </Menu.Item>
                    {currentUser ? (
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                            onClick={() => logout()}
                          >
                            Logout
                          </p>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/login"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Login
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {/* <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
      </>
    </Disclosure>
  );
}
