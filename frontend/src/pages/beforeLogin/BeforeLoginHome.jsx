import React from "react";
import BeforeLoginNavbar from "../../components/navigation/BeforeLoginNavbar";
import SlideBar from "../../components/input/SlideBar";

const BeforeLoginHome = () => {
  return (
    <main>
      <BeforeLoginNavbar />
      <section className="flex justify-center items-center min-h-screen px-20 rounded-xl">
        <div className="w-full max-w-4xl ">
          <SlideBar />
        </div>
      </section>
    </main>
  );
};

export default BeforeLoginHome;
