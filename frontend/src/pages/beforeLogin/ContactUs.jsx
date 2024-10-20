import React from "react";
import BeforeLoginNavbar from "../../components/navigation/BeforeLoginNavbar";

const ContactUs = () => {
  return (
    <main>
      <BeforeLoginNavbar />
      <section className="flex justify-center items-center h-screen p-7  text-gray-800">
        <div className="flex flex-col justify-center items-center rounded-xl bg-slate-100 shadow-md w-96">
          <h1 className="text-3xl font-bold mt-8">Contact Us</h1>
          <p className="text-xl m-8 text-center">Need help? Contact us via:</p>
          <p className="text-lg text-left mb-8">
            Email:{" "}
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMTgmMhnSNSRQdtvRbbkGtBDsmxbFlBQPTBwNWPwKBnMcXlBPHGgvtsDJVlWXlsTjXLbJvf">
              supun@onedatasoftware.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
