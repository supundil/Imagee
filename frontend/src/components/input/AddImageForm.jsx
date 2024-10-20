import React, { useState, useRef } from "react";
import { useTags } from "../../hooks/useTags";
import { useNavigate } from "react-router-dom";

const AddImageForm = () => {
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const { predefinedTags, tags, newTag, setNewTag, addTag, removeTag } =
    useTags();
  const [allowComments, setAllowComments] = useState(false);
  const [showPublishButton, setShowPublishButton] = useState(false);
  const [error, setError] = useState("");
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleImageUpload = (file) => {
    const maxImageSizeMB = 50;
    if (file.size > maxImageSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxImageSizeMB} MB`);
      setImageData(null);
      return;
    }
    setImageData(file);
    setShowPublishButton(true);
    setError("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageData || !title || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("imageData", imageData);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("tags", JSON.stringify(tags));
    formData.append("allowComments", allowComments.toString());

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authorization token found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:8000/api/images/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to upload image");
        return;
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      navigate("/after-login-home");
    } catch (error) {
      setError("An error occurred: " + error.message);
    }
  };

  const handleTagInputFocus = () => {
    setShowTagsDropdown(true);
  };

  const handleTagInputBlur = () => {
    setTimeout(() => setShowTagsDropdown(false), 200);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      addTag(newTag);
      setNewTag("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md"
    >
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
        className={`relative flex justify-center items-center ${
          imageData ? "border-none" : "border-2 border-dashed border-gray-300"
        } bg-gray-100 text-center rounded-md cursor-pointer h-64`}
      >
        {imageData ? (
          <div className="relative w-full h-full flex justify-center items-center">
            {imageData.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(imageData)}
                alt="Uploaded"
                className="max-w-full max-h-full object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => {
                setImageData(null);
                setShowPublishButton(false);
              }}
              className="absolute top-2 right-2 text-white bg-red-600 p-1 rounded-full hover:bg-red-700"
            >
              &times;
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-500">
              Choose a file or drag and drop it here
            </p>
            <p className="text-sm text-gray-400">
              We recommend using high-quality .jpg files less than 20 MB or .mp4
              files less than 200 MB.
            </p>
          </div>
        )}
        <input
          id="imageUpload"
          type="file"
          accept=".jpg,.jpeg,.png,.mp4"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a title"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a detailed description"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        rows="4"
      />

      <input
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Add a link"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />

      <div className="flex flex-col gap-4">
        <label className="text-gray-700 font-medium">Tags:</label>
        <div className="relative">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onFocus={handleTagInputFocus}
            onBlur={handleTagInputBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTag();
              }
            }}
            placeholder="Add custom tag"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="mt-2 bg-indigo-600 text-white font-semibold rounded-md py-2 px-4"
          >
            Add Tag
          </button>
          {showTagsDropdown && (
            <div className="absolute z-10 w-full max-h-48 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg mt-1">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="block w-full text-left px-3 py-2 hover:bg-gray-200"
                  onClick={() => {
                    addTag(tag);
                    setShowTagsDropdown(false);
                    setNewTag("");
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full flex items-center"
            >
              {tag}{" "}
              <button
                type="button"
                className="ml-2 text-red-600 hover:text-red-800"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <label className="flex items-center">
        <input
          type="checkbox"
          checked={allowComments}
          onChange={(e) => setAllowComments(e.target.checked)}
          className="mr-2"
        />
        Allow comments
      </label>

      {showPublishButton && (
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white font-semibold rounded-md py-2 px-4"
        >
          Publish
        </button>
      )}
    </form>
  );
};

export default AddImageForm;
