import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ text }) => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await fetch("http://localhost:8000/api/auth/google-login", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to log in with Google");
      }

      const data = await res.json();
      setLoginData(data);
      localStorage.setItem("loginData", JSON.stringify(data));

      window.location.href = "/after-login-home";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          console.error("Login failed");
        }}
      >
        <button style={{ width: "100%" }}>{text}</button>
      </GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
