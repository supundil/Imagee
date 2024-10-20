import React from "react";
import BeforeLoginNavbar from "../../components/navigation/BeforeLoginNavbar";

const About = () => {
  return (
    <main>
      <BeforeLoginNavbar />
      <section className="p-7 pt-20 text-gray-800">
        <h1 className="text-3xl  font-bold">About</h1>
        <p className="text-lg ">
          Welcome to Imagee, your ultimate platform for sharing and managing
          images effortlessly! Imagee provides a seamless experience for adding,
          following, uploading, and interacting with images. Whether you are an
          artist, photographer, or simply love sharing moments, Imagee caters to
          all your image-sharing needs.
        </p>
        <hr className="mt-8 " />
        <h2 className="text-xl  font-bold mt-2">1. What is Imagee?</h2>
        <p className="text-lg ">
          <span className="font-bold">Imagee</span> is a powerful image-sharing
          platform where users can:
        </p>
        <ul className="mt-5 ml-8 list-disc">
          <li>
            <span className="font-bold">Add images</span> to their personal
            gallery.
          </li>
          <li>
            <span className="font-bold">Follow images</span> uploaded by other
            users, getting updates whenever changes are made.
          </li>
          <li>
            <span className="font-bold">Upload and share images</span> easily
            across the platform.
          </li>
          <li>
            <span className="font-bold">Explore and interact</span> with images
            shared by the global community.
          </li>
        </ul>
        <p className="text-lg  mt-2">
          With a user-friendly interface, Imagee enhances the way you manage
          your images, providing features that make organizing and sharing
          visuals a breeze.
        </p>
        <hr className="mt-8" />
        <h2 className="text-xl  font-bold mt-2">2. Key Features of Imagee</h2>
        <ul className="mt-5 ml-8 text-lg list-disc">
          <li className="font-bold mt-3">Add Images:</li>
          <ul className=" list-disc  ml-3">
            <li>
              Users can add images to their gallery with titles, tags, and
              descriptions.
            </li>
            <li>
              Organize images into albums or categories for better management.
            </li>
          </ul>
          <li className="font-bold mt-3">Follow Images:</li>
          <ul className="list-disc ml-3">
            <li>Stay updated by following images of your interest.</li>
          </ul>
          <li className="font-bold mt-3">Upload Images:</li>
          <ul className="list-disc ml-3">
            <li>Simple drag-and-drop functionality for quick image uploads.</li>
            <li>Multiple formats supported: JPEG, PNG, GIF, etc.</li>
          </ul>
          <li className="font-bold mt-3">Explore Images:</li>
          <ul className="list-disc ml-3">
            <li>Discover trending images from around the world.</li>
            <li>
              Search and filter by categories like art, photography, design,
              etc.
            </li>
          </ul>
          <li className="font-bold mt-3">Social Interactions:</li>
          <ul className="list-disc ml-3">
            <li>
              Like, comment, and share images within the Imagee community.
            </li>
            <li>
              Follow other users to see their latest uploads in your feed.
            </li>
          </ul>
        </ul>
        <hr className="mt-8 " />
        <h2 className="text-xl font-bold mt-2">
          3. How to Add and Follow Images
        </h2>
        <ul className="mt-5 ml-8 text-lg list-disc">
          <li className="font-bold mt-3">Add an Image:</li>
          <ul className="list-disc ml-3">
            <li>Click on the "Add Image" button on the dashboard.</li>
            <li>
              Choose the image from your device, add a title and description.
            </li>
            <li>Categorize your image to make it easily discoverable.</li>
            <li>Optionally, add tags for search optimization.</li>
          </ul>
          <li className="font-bold mt-3">Follow an Image:</li>
          <ul className="list-disc ml-3">
            <li>Browse or search for an image.</li>
            <li>Click on the “Follow” button on the image page.</li>
            <li>
              Get real-time updates on image changes, edits, or new versions.
            </li>
          </ul>
        </ul>
        <hr className="mt-8 " />
        <h2 className="text-xl font-bold mt-2">5. Upload Process</h2>
        <ul className="mt-5 ml-8 text-lg list-disc">
          <li className="font-bold mt-3">Single Image Upload:</li>
          <ul className="list-disc ml-3">
            <li>Drag and drop or select an image from your device.</li>
            <li>Add optional details such as tags and album placement.</li>
          </ul>
        </ul>
      </section>
    </main>
  );
};

export default About;
