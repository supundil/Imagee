import React from "react";
import AddImageForm from "../../components/input/AddImageForm";
import AfterLoginNavbar from "../../components/navigation/AfterLoginNavbar";

const AddImagePage = () => {
  return (
    <main className="add-image-page p-10 ml-20">
      <AfterLoginNavbar />
      <h1 className="text-2xl font-semibold mb-4">Add New Image</h1>
      <p>Drag and drop an image or select from your files.</p>
      <AddImageForm />
    </main>
  );
};

export default AddImagePage;
