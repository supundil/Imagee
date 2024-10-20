import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BeforeLoginHome from "./pages/beforeLogin/BeforeLoginHome";
import About from "./pages/beforeLogin/About";
import ContactUs from "./pages/beforeLogin/ContactUs";
import Login from "./pages/common/Login";
import Signup from "./pages/common/Signup";
import { AuthProvider } from "./components/google/AuthContext";
import AfterLoginHome from "./pages/afterLogin/AfterLoginHome";
import AddImagePage from "./pages/afterLogin/AddImagePage";
import ImageDetails from "./pages/afterLogin/ImageDetails";
import Profile from "./pages/afterLogin/Profile";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BeforeLoginHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/after-login-home" element={<AfterLoginHome />} />
            <Route path="/add-image" element={<AddImagePage />} />
            <Route path="/image/:id" element={<ImageDetails />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
