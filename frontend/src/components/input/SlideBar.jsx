import React, { useEffect, useState } from "react";

const slides = [
  { id: 1, text: " Welcome to our Imagee!" },
  { id: 2, text: "Do you want to upload images?" },
  { id: 3, text: "Do you want to like images?" },
  { id: 4, text: "Do you want to follow images?" },
  { id: 5, text: "This is the Application what you want!" },
  { id: 6, text: "Want to join, Click sign up!" },
  { id: 7, text: "Need details, Click about!" },
  { id: 8, text: "Want to contact, click contact!" },
];

const SlideBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <main>
      <section className="relative w-full h-60 overflow-hidden bg-gray-200">
        <style>
          {`
          @keyframes slide-in-left {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slide-out-right {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }

          .slide-in-left {
            animation: slide-in-left 1s forwards;
          }

          .slide-out-right {
            animation: slide-out-right 1s forwards;
          }
        `}
        </style>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100 slide-in-left" : ""
            } ${
              index === (currentIndex + 1) % slides.length
                ? "opacity-0 slide-out-right"
                : ""
            }`}
            style={{
              display: index === currentIndex ? "block" : "none",
            }}
          >
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl font-bold text-center">{slide.text}</h2>
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </main>
  );
};

export default SlideBar;
