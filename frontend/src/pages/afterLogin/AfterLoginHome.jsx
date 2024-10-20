import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AfterLoginNavbar from "../../components/navigation/AfterLoginNavbar";

const AfterLoginHome = () => {
  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/images/");
        setImageData(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to fetch images.");
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <AfterLoginNavbar />
      <main className="after-login-home p-10 ml-20">
        <h1 className="text-2xl font-semibold mb-4">Uploaded Images</h1>
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imageData.map((image) => (
            <div
              key={image._id}
              className="relative group bg-white w-full h-96 shadow-lg rounded-md overflow-hidden"
            >
              <img
                src={`http://localhost:8000/${image.imagePath}`}
                alt={image.title}
                className="w-full h-full object-cover rounded-xl"
              />

              <button className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Save
              </button>

              {image.link && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={image.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-center text-lg underline"
                  >
                    Visit link
                  </a>
                </div>
              )}

              <Link
                to={`/image/${image._id}`}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default AfterLoginHome;
