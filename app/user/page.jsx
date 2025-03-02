// "use client"
// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const UserPage = () => {
//   const searchParams = useSearchParams();
//   const username = searchParams.get("username");
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (!username) return;
//     // Simulating fetching user's uploaded images from API
//     const fetchImages = async () => {
//       // Replace with actual API request
//       const userImages = [
//         "https://source.unsplash.com/random/300x300",
//         "https://source.unsplash.com/random/301x300",
//         "https://source.unsplash.com/random/302x300",
//         "https://source.unsplash.com/random/303x300",
//         "https://source.unsplash.com/random/304x300",
//         "https://source.unsplash.com/random/305x300",
//       ];
//       setImages(userImages);
//     };
//     fetchImages();
//   }, [username]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//     <h1 className="text-2xl font-semibold text-gray-800">{username ? `${username}'s Public Gallery` : "User Public Gallery"}</h1>
//     <div className="grid grid-cols-3 gap-2 mt-6 w-full max-w-4xl">
//       {images.map((src, index) => (
//         <img key={index} src={src} alt="User upload" className="w-full h-auto rounded-lg shadow-md" />
//       ))}
//     </div>
//   </div>
//    );
// };

// export default UserPage;