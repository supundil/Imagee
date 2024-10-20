import React, { useEffect, useState } from "react";
import axios from "axios";
import AfterLoginNavbar from "../../components/navigation/AfterLoginNavbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Error fetching user profile.");
      }
    };

    const fetchUserImages = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8000/api/images/user-images",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImages(response.data);
      } catch (err) {
        console.error("Error fetching user images:", err);
        setError("Error fetching user images.");
      }
      setLoading(false);
    };

    fetchUserProfile();
    fetchUserImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <AfterLoginNavbar />
      <section className="p-12 ml-12">
        <div className="container bg-slate-100 rounded-xl p-7">
          <div className="text-gray-800 text-center">
            <h1 className=" text-4xl font-bold ">Profile Page</h1>
            {user ? (
              <div>
                <h2 className="text-2xl mt-8">
                  Welcome,{" "}
                  <span className="font-bold">
                    {user.displayName || "User"}
                  </span>
                </h2>
                <p className="text-xl">
                  Email: {user.email || "Email not available"}
                </p>
              </div>
            ) : (
              <p>Loading user information...</p>
            )}
          </div>

          <h3 className="mt-24 text-gray-800 text-xl font-bold">
            Your Uploaded Images:
          </h3>
          <hr className="m-8 text-gray-800 border-2" />
          {images.length > 0 ? (
            <div className="flex flex-wrap justify-start">
              {images.map((image) => (
                <div className="p-4" key={image._id}>
                  <div className="card bg-white rounded-xl p-5 w-80 md:w-96 m-5 shadow-lg">
                    <img
                      src={`http://localhost:8000/${image.imagePath}`}
                      alt={image.title}
                      className="card-img-top object-cover h-64 w-full rounded-lg"
                    />
                    <div className="card-body text-gray-800 mt-3">
                      <h5 className="card-title">Title: {image.title}</h5>
                      <p className="card-text">
                        Description: {image.description}
                      </p>
                      <p className="card-text">Tags: {image.tags.join(", ")}</p>
                      <p className="card-text">
                        Uploaded by: {user?.displayName || "Unknown User"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You have not uploaded any images yet.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
