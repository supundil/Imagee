import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AfterLoginNavbar from "../../components/navigation/AfterLoginNavbar";
import { useAuth } from "../../components/google/AuthContext";

const ImageDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.id : null;
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/images/${id}`
        );
        setImage(response.data);
        setLikeCount(response.data.likes.length || 0);
        setComments(response.data.comments || []);

        setHasLiked(
          currentUserId && response.data.likes.includes(currentUserId)
        );

        if (currentUserId) {
          const userResponse = await axios.get(
            `http://localhost:8000/api/auth/profile`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );

          const followingIds = userResponse.data.following.map((user) =>
            user.toString()
          );
          setIsFollowing(followingIds.includes(response.data.uploadedBy._id));
        }
      } catch (error) {
        console.error("Error fetching image details:", error);
        setError("Failed to fetch image details.");
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [id, currentUserId]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You must be logged in to like an image.");
        return;
      }
      const response = await axios.put(
        `http://localhost:8000/api/images/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setLikeCount(likeCount + (hasLiked ? -1 : 1));
        setHasLiked(!hasLiked);
      }
    } catch (error) {
      console.error("Error liking image:", error);
      setError("Failed to like the image.");
    }
  };

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You must be logged in to follow users.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/auth/users/${image.uploadedBy._id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error(
        "Error following user:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to follow the user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You must be logged in to comment.");
        return;
      }
      const response = await axios.post(
        `http://localhost:8000/api/images/${id}/comments`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment.");
    }
  };

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!image) {
    return <p>Image not found.</p>;
  }

  return (
    <>
      <AfterLoginNavbar />
      <main className="p-10 ml-20">
        <div className="bg-white shadow-lg rounded-md overflow-hidden">
          <img
            src={`http://localhost:8000/${image.imagePath}`}
            alt={image.title}
            className="w-auto h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-2">{image.title}</h1>
            <p className="text-gray-700 mb-4">{image.description}</p>
            <p className="text-gray-700 mb-4 gap-2">
              {image.tags.map((tag, index) => (
                <span key={index} className="mr-2 font-bold">
                  #{tag}
                </span>
              ))}
            </p>
            {image.link && (
              <a
                href={image.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mb-4 block"
              >
                Visit Link
              </a>
            )}
            <div className="flex items-center mb-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleLike}
              >
                {hasLiked ? "Liked" : "Like"} ({likeCount})
              </button>
              <div className="ml-4 text-sm">
                Uploaded by:{" "}
                <a
                  href={`/user/${image.uploadedBy._id}`}
                  className="text-blue-500"
                >
                  {image.uploadedBy.displayName}
                </a>
              </div>
              <div className="flex items-center">
                <button
                  className={`ml-4 px-3 py-1 rounded-md transition duration-200 ${
                    isFollowing
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                  onClick={handleFollow}
                  disabled={isFollowing || isLoading}
                  aria-live="polite"
                >
                  {isLoading ? (
                    <span className="animate-spin">Loading...</span>
                  ) : isFollowing ? (
                    "Following"
                  ) : (
                    "Follow"
                  )}
                </button>
                {isFollowing && !isLoading && (
                  <span className="ml-2 text-sm text-gray-600">
                    You are following this user.
                  </span>
                )}
              </div>
            </div>
            {image.allowComments && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Comments</h2>
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder="Add a comment..."
                    rows="4"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">
                    Submit
                  </button>
                </form>
                <div className="mt-4 text-gray-800">
                  {comments.map((comment) => (
                    <div key={comment._id} className="mb-2">
                      <span className="font-semibold">
                        {comment.user
                          ? comment.user.displayName || comment.userId
                          : "Unknown User"}
                        :
                      </span>
                      <span>{comment.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ImageDetails;
