import React from 'react';

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-red-700 text-white p-4 flex justify-between items-center rounded-full shadow-lg z-50">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold px-4 py-2 rounded-full">Brick & Beams</h1>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-full text-gray-300 w-64 bg-black "
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Right Section */}
      <div className="flex gap-4">
        <span className="px-4 py-2 rounded-full cursor-pointer hover:bg-red-900 transition">Agra ▼</span>
        <span className="px-4 py-2  rounded-full cursor-pointer hover:bg-red-900 transition">Login →</span>
      </div>

    </nav>
  );
};

export default NavBar;
