

// import React from 'react'
// // import Register from './components/Register'
// // import PropertyList from './components/PropertyList'
// // import AddProperty from './components/AddProperty'

// // const App = () => {
// //   return (
// //     <><Register/>
// //     <AddProperty/>
// //     <PropertyList/>
// //     </>
// //   )
// // }

// // export default App
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from './components/Register'
// import PropertyList from './components/PropertyList'
// import AddProperty from './components/AddProperty'
// import Login from './components/Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
      
//       <Route path="/" element={<Register/>} />
//       <Route path="/propertylist" element={<PropertyList/>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/add-property" element={<AddProperty />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddProperty from "./Pages/AddProperty";
import PropertyDetails from "./Pages/PropertyDetails";
import UserProfile from "./Pages/UserProfile";
import Dashboard from "./Pages/Dashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PropertyPage from "./Pages/Propertpage";


function App() {
  return (
  
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={<AddProperty />} />
          <Route path="/propertyPage" element={<PropertyPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
        <Footer />
      </Router>
  
  );
}

export default App;


