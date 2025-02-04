import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import heroBg from "../assets/Login-Hero.png";
// import { FaRegUser } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            console.log(data.role)
    
           
            if (data.role === "admin") {
                navigate("/dashboard"); // Redirect admin to dashboard
            } 
            else {
                navigate("/properties"); 
            }
        } catch (err) {
            setError("Invalid credentials or access denied");
        }
        
    };

    return (
        <div className="w-full min-h-screen bg-black">
        <div className="flex items-center justify-center w-full h-9/10" style={{backgroundImage:`url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", height:"90vh",
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,}}>
            <div className="w-80 h-90 flex flex-col mx-auto my-100 text-white p-4 gap-5 bg-gradient-to-r from-white/20 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg">

            <h2 className="text-3xl text-center font-semibold mt-2 mb-8">Login</h2>
            
             {/* <div>
             <FaRegUser/>  
            <h2 className="text-3xl text-center font-semibold mt-2 mb-8">Login</h2>
             </div> */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                <input className="border-gray-300 border-1 focus:outline-none w-full text-lg p-2 rounded-lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="border-gray-300 border-1 focus:outline-none w-full text-lg p-2 rounded-lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-gradient-to-r from-white/60 to-white/10 w-full text-xl font-semibold px-6 py-2 rounded-lg text-white hover:bg-gradient-to-l from-white/60 to-white/10" type="submit">Login →</button>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Login;