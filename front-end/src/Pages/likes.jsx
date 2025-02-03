import React, { useState } from "react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative flex items-center h-12 w-36 bg-gray-900 rounded-xl shadow-inner hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Heart Icon and Like Text */}
      <label
        htmlFor="heart"
        className="flex items-center justify-evenly w-4/5 h-full cursor-pointer"
        onClick={() => setLiked(!liked)}
      >
        <svg
          className={`h-7 w-7 transition-all duration-200 ${
            liked ? "fill-red-500 scale-110" : "fill-gray-500"
          }`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
        <span className="text-white text-lg font-semibold">Likes</span>
      </label>

      {/* Like Count */}
      <div className="absolute right-0 w-1/5 h-full flex justify-center items-center text-gray-400 text-lg border-l-2 border-gray-700 transition-all duration-500">
        {liked ? "69" : "68"}
      </div>
    </div>
  );
};

export default LikeButton;
