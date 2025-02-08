// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { FaSearch } from "react-icons/fa";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(false);


//   useEffect(() => {
//     const checkUser = () => {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       setUser(storedUser);
//     };
  
//     window.addEventListener("storage", checkUser);
//     checkUser(); // Run once on mount
  
//     return () => window.removeEventListener("storage", checkUser);
//   }, []);
  
//   // useEffect(() => {
//   //   const storedUser = JSON.parse(localStorage.getItem("user"));
//   //   setUser(storedUser);
//   // }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(false);
//     navigate("/");
//   };

//   return (
//     <nav className="fixed top-0 w-9/10 bg-red-700 p-4 text-white flex flex-row justify-between ml-15 mt-2 z-10 rounded-full">
//       <Link to="/">
//         <h1 className="flex text-2xl font-bold px-4 py-2 rounded-full">
//           <img src={logo} alt="Logo" className="w-7 h-7" /> Brick & Beams
//         </h1>
//       </Link>

//       {/* Search Bar */}
//       <div className="relative w-64 ml-20 mt-1">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full bg-black pl-10 pr-4 py-2 rounded-full"
//         />
//         <FaSearch className="absolute cursor-pointer left-3 top-3 text-gray-400 text-lg" />
//       </div>

//       {/* Right Section */}
//       <div className="flex gap-4 items-center">
//         <Link to="/propertyPage" className="px-4 py-2 rounded-full cursor-pointer hover:bg-red-900 transition">
//           Properties
//         </Link>

//         {user ? (
//           <>
//             <Link to="/userDashboard" className="px-4 py-2 rounded-full cursor-pointer hover:bg-red-900 transition">
//               Profile
//             </Link>
//             <button onClick={handleLogout} className="px-4 py-2 rounded-full cursor-pointer hover:bg-red-900 transition">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="px-4 py-2 rounded-full cursor-pointer hover:bg-red-900 transition">
//               Login →
//             </Link>
//             <Link to="/register" className="px-4 py-2 rounded-full cursor-pointer hover:bg-red-900 transition">
//               Register →
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;





import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the context
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext); // Use context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-9/10 bg-red-700 p-4 text-white flex flex-row justify-between ml-15 mt-2 z-10 rounded-full">
      <Link to="/">
        <h1 className="flex text-2xl font-bold px-4 py-2 rounded-full">
          <img src={logo} alt="Logo" className="w-7 h-7" /> Brick & Beams
        </h1>
      </Link>

      {/* Search Bar */}
      <div className="relative w-64 ml-20 mt-1">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white text-black pl-10 pr-4 py-2 rounded-full outline-none"
        />
        <FaSearch className="absolute cursor-pointer left-3 top-3 text-gray-800 text-lg" />
      </div>

      {/* Right Section */}
      <div className="flex gap-4 items-center">
        <Link to="/propertyPage" className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
          Properties
        </Link>

        {user ? (
          <>
            <Link to="/userDashboard" className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              Profile
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              Login →
            </Link>
            <Link to="/register" className="px-4 py-2 font-bold rounded-full cursor-pointer hover:bg-white hover:text-black transition">
              Register →
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
