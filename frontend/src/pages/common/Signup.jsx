import React, { useState } from "react";
import PasswordInput from "../../components/input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import EmailInput from "../../components/input/EmailInput";
import GoogleLoginButton from "../../components/google/GoogleLoginButton";
import { useAuth } from "../../components/google/AuthContext";
import axios from "axios";
import NameInput from "../../components/input/NameInput";

const Signup = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    console.log("Sending signup request with:", {
      displayName,
      email: email.trim(),
      password,
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          displayName,
          email: email.trim(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        setIsLoggedIn(true);
        closeModal();

        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error);

      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div>
      <main
        id="modal-overlay"
        onClick={handleClickOutside}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <section className="relative w-96 h-auto bg-white p-6 rounded-xl shadow-lg">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-800 hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Welcome to Imagee
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="px-10">
              <label className="text-gray-800 text-sm">Name</label>
              <NameInput
                placeholder="Enter your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="px-10 ">
              <label className="text-gray-800 text-sm">Email</label>
              <EmailInput
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="px-10">
              <label className="text-gray-800 text-sm">Password</label>
              <PasswordInput
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="px-10">
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
              <button
                type="submit"
                className="mt-8 px-10 py-2 w-full bg-green-400 text-white font-semibold rounded-xl shadow-md hover:bg-green-500"
              >
                Sign Up
              </button>

              <div className="flex items-center justify-center mt-8 mb-2">
                <hr className="w-1/3" />
                <span className="px-4 text-gray-500">or</span>
                <hr className="w-1/3" />
              </div>
              <GoogleLoginButton text="Sign in with Google" />
              <p className="text-sm text-center mt-4">
                Already a member?{" "}
                <Link to="/login" className="text-blue-600 font-bold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Signup;
