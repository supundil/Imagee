import React, { useState } from "react";
import PasswordInput from "../../components/input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import EmailInput from "../../components/input/EmailInput";
import GoogleLoginButton from "../../components/google/GoogleLoginButton";
import { useAuth } from "../../components/google/AuthContext";
import axios from "axios";

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login Successful:", response.data);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        setIsLoggedIn(true);
        navigate("/after-login-home");
        closeModal();
      } else {
        setError("Login failed. No token provided.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
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
        <form onSubmit={handleLogin}>
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
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <button
              type="submit"
              className="mt-8 px-10 py-2 w-full bg-green-400 text-white font-semibold rounded-xl shadow-md hover:bg-green-500"
            >
              Login
            </button>

            <div className="flex items-center justify-center mt-8 mb-2">
              <hr className="w-1/3" />
              <span className="px-4 text-gray-500">or</span>
              <hr className="w-1/3" />
            </div>
            <GoogleLoginButton text="Sign in with Google" />
            <p className="text-sm text-center mt-4">
              Not on Imagee yet?{" "}
              <Link to="/signup" className="text-blue-600 font-bold">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
