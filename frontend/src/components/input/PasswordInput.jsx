import { FaEye, FaEyeSlash, FaUserLock } from "react-icons/fa";
import { useState } from "react";

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <div className="relative">
        <FaUserLock className="absolute left-3 mt-5 transform -translate-y-1/2 text-gray-300" />
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="mt-2 block w-full pl-10 px-3 py-2 border  rounded-xl focus:outline-none hover:outline-blue-400 focus:outline-blue-400 "
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-300 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
