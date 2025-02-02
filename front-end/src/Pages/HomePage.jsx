import React from "react";
import heroBg from "../assets/hero-section.jpg";

const HomePage = () => {
  return (
    <div className="relative w-full min-h-screen bg-black">

      {/* Hero Section */}
      <div
        className="relative flex flex-col justify-center items-center text-center text-white py-32 px-6"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height:"90vh",
          borderBottomRightRadius:20,
          borderBottomLeftRadius:20,
        }}
      >
        <h2 className="text-5xl font-bold mb-5">
          Buying & Selling Property <br /> Made Easy With{" "}
          <span className="text-red-600">Brick & Beams</span>
        </h2>

        {/* Search Filters */}
        <div className="bg-black bg-opacity-50 rounded-full p-4 mt-6 flex gap-4">
          <select className="py-2 px-4 bg-black text-white rounded">
            <option>Home</option>
          </select>
          <select className="py-2 px-4 bg-black text-white rounded">
            <option>Location</option>
          </select>
          <select className="py-2 px-4 bg-black text-white rounded">
            <option>Size</option>
          </select>
          <select className="py-2 px-4  bg-black text-white rounded">
            <option>Price</option>
          </select>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full flex items-center">
            Search 🔍
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
