import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Login from "../../pages/common/Login";
import Signup from "../../pages/common/Signup";

const BeforeLoginNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
  };

  const closeSignup = () => {
    setIsSignupOpen(false);
  };

  return (
    <>
      <nav className="bg-white p-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50 ">
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/"
            className="text-green-500 text-xl font-bold ml-5 hover:no-underline"
          >
            Imagee
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          <Link
            to="/about"
            className="text-gray-900 text-xl mr-10 hover:no-underline"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-900 text-xl mr-10 hover:no-underline"
          >
            Contact Us
          </Link>
          <div>
            <button
              onClick={openLogin}
              className="text-gray-900 bg-green-400 hover:bg-green-500 p-2 rounded-2xl text-xl mr-3"
            >
              Log in
            </button>
            <button
              onClick={openSignup}
              className="text-gray-900 bg-gray-200 hover:bg-gray-300 p-2 rounded-2xl text-xl"
            >
              Sign up
            </button>
          </div>
        </div>

        <button
          className="md:hidden text-gray-800 absolute top-2 right-2 z-10"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IoMdCloseCircleOutline /> : <RiMenuFill />}
        </button>

        {isMenuOpen && (
          <div className="right-0 h-screen bg-white p-4 flex flex-col items-center md:hidden absolute top-6 left-0 w-full z-50">
            <ul className="list-none p-0 m-0 flex flex-col items-center h-full">
              <li className="text-left justify-start absolute top-0 left-2">
                <Link
                  to="/"
                  className="text-green-500 text-xl font-bold hover:no-underline"
                >
                  Imagee
                </Link>
              </li>
              <li className="mb-6 mt-20">
                <Link
                  to="/about"
                  className="text-gray-900 text-xl hover:no-underline"
                >
                  About
                </Link>
              </li>
              <li className="mb-10">
                <Link
                  to="/contact"
                  className="text-gray-900 text-xl hover:no-underline"
                >
                  Contact Us
                </Link>
              </li>
              <li className="mb-6">
                <button
                  onClick={openLogin}
                  className="text-gray-900 bg-green-400 hover:bg-green-500 p-2 rounded-2xl text-xl"
                >
                  Log in
                </button>
              </li>
              <li>
                <button
                  onClick={openSignup}
                  className="text-gray-900 bg-gray-200 hover:bg-gray-300 p-2 rounded-2xl text-xl"
                >
                  Sign up
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      {isLoginOpen && <Login closeModal={closeLogin} />}{" "}
      {isSignupOpen && <Signup closeModal={closeSignup} />}
    </>
  );
};

export default BeforeLoginNavbar;
