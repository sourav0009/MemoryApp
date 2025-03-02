"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "@/config/firebase";

export default function Home() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [memory, setMemory] = useState(null);

  // Fetch user images
  const fetchUser = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/get-memory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email: user.email,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setMemory(data.user.images); // Set only images array
      } else {
        console.error("Error fetching user images:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
      fetchUser();
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
  }, [isUserLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <nav className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-800">Memory Mosaic</h1>
        <div>
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Sign Up
          </a>
          
        </div>
      </nav>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        Explore User Memories
      </h2>

      {memory && memory.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 mt-6 w-full max-w-4xl">
          {memory.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="User upload"
              className="w-full h-auto rounded-lg shadow-md"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No images found</p>
      )}

      <div className="mt-6 flex space-x-4">
      <a
            href="http://localhost:3000/user/profile"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Uplod photo
          </a>
      </div>
    </div>
  );
}
