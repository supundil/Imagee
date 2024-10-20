import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { CgMoreO } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";

const AfterLoginNavbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    localStorage.removeItem("authToken");

    navigate("/");
  };

  return (
    <nav className="bg-slate-100 shadow py-3 flex flex-col border-r-2 border-black items-center fixed top-0 left-0 bottom-0 z-50 w-16">
      <div className="flex flex-col items-start relative mt-8">
        <div className="group relative flex flex-col items-center">
          <Link
            to="/after-login-home"
            className="text-green-500 text-xs ml-2 font-bold hover:no-underline mb-3"
          >
            Imagee
          </Link>
          <div className="absolute left-14 hidden group-hover:flex flex-row items-center">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-xl">
              Home
            </span>
          </div>
        </div>
        <div className="group relative flex flex-col items-center">
          <Link
            to="/add-image"
            className="text-gray-800 text-2xl ml-4 font-bold hover:no-underline mb-3"
          >
            <MdOutlineAddCircle />
          </Link>
          <div className="absolute left-14 hidden group-hover:flex flex-row items-center">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-xl">
              Add
            </span>
          </div>
        </div>
        <div className="group relative flex flex-col items-center">
          <Link
            to="/profile"
            className="text-gray-800 text-2xl ml-4 font-bold hover:no-underline mb-3"
          >
            <CgProfile />
          </Link>
          <div className="absolute left-14 hidden group-hover:flex flex-row items-center">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-xl">
              Profile
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto mb-4 flex flex-col items-center">
        <div className="group relative flex flex-col items-center">
          <button
            onClick={toggleDropdown}
            className="text-gray-800 text-2xl font-bold hover:no-underline mb-3"
          >
            <CgMoreO />
          </button>

          <div className="absolute left-14 hidden group-hover:flex flex-row items-center mt-1">
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded-xl">
              More Options
            </span>
          </div>

          {isDropdownVisible && (
            <div className="absolute left-14 mt-1 bg-gray-200 shadow-lg rounded-lg p-2 z-40">
              <button
                onClick={handleLogout}
                className="block text-black text-xs py-1 px-2 hover:bg-gray-300 rounded hover:no-underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AfterLoginNavbar;
