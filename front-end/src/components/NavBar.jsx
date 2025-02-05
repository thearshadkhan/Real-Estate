import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";



const NavBar = () => {
  return (

    <nav className='fixed top-0 w-9/10 bg-red-700 p-4 text-white flex flex-row justify-between ml-15 mt-2 z-10 rounded-full'>
      <Link to='/'><h1 className="flex text-2xl font-bold px-4 py-2 rounded-full"><img src={logo} alt="Logo" className="w-7 h-7" />Brick & Beams
      </h1></Link>

      {/* Search Bar */}
      <div className="relative w-64 ml-20 mt-1">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-black pl-10 pr-4 py-2 rounded-full "
        />
        <FaSearch className="absolute cursor-pointer left-3 top-3 text-gray-400 text-lg" />
      </div>


      {/* Right Section */}
      <div className="flex gap-4 items-center">
        <Link to="/properties" className="px-4 py-2  rounded-full cursor-pointer hover:bg-red-900 transition">Add Property +</Link>
        <Link to="/Login" className="px-4 py-2  rounded-full cursor-pointer hover:bg-red-900 transition">Login →</Link>
        <Link to="/Register" className="px-4 py-2  rounded-full cursor-pointer hover:bg-red-900 transition">Register →</Link>
      </div>

    </nav>
  );
};

export default NavBar;
