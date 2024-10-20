import React from "react";
import { MdEmail } from "react-icons/md";

const EmailInput = ({ placeholder, value, onChange }) => {
  return (
    <div>
      <div className="relative">
        <MdEmail className="absolute left-3 mt-5 transform -translate-y-1/2 text-gray-300" />
        <input
          type="email"
          className="mt-2 block w-full pl-10 px-3 py-2 border  rounded-xl focus:outline-none hover:outline-blue-400 focus:outline-blue-400 "
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default EmailInput;
