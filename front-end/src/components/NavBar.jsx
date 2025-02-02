import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (

    <nav className='fixed top-0 w-9/10 bg-red-700 p-4 text-white flex flex-row justify-between ml-15 mt-2 z-10 rounded-full'>
    <Link to='/'><h1 className="text-2xl font-bold px-4 py-2 rounded-full">Brick & Beams</h1></Link>

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
      <div className="flex gap-4 items-center">
        <select className="bg-red-700 px-4 py-2 rounded-full cursor-pointer hover:bg-red-800 transition">
          <option value="">Agra</option>
          <option value="">Noida</option>
          <option value="">Gurugram</option>
        </select>
        <Link to="/Login" className="px-4 py-2  rounded-full cursor-pointer hover:bg-red-900 transition">Login →</Link>
        <Link to="/Register" className="px-4 py-2  rounded-full cursor-pointer hover:bg-red-900 transition">Register →</Link>
      </div>
    
    </nav>
  );
};

export default NavBar;
