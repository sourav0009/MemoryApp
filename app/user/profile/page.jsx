"use client"
import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

const Profile = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  let email = null;
  if (user) {
    email = user.email
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile || !user) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "email": user.email, // Ensure email is sent
        },
        body: formData,
      });

      if (res.ok) {
        alert("File uploaded successfully");
        router.push("/");
      } else {
        alert("Failed to upload");
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold text-gray-800">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mt-4 w-full max-w-md">
        <h2 className="text-lg font-medium text-gray-700">Upload Image</h2>
        <form onSubmit={handleImageUpload} className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Upload
          </button>
        </form>
      </div>
      <h2 className="text-lg font-medium text-gray-700 mt-6">Uploaded Images</h2>
      <div className="grid grid-cols-3 gap-2 mt-4 w-full max-w-4xl">
        {images.map((src, index) => (
          <img key={index} src={src} alt="Uploaded" className="w-full h-auto rounded-lg shadow-md" />
        ))}
      </div>
    </div>
  );
};

export default Profile;