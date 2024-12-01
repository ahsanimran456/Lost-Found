import React from "react";
import { FaGoogle } from "react-icons/fa"; // Google icon from react-icons

const LoginScreen = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-700 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Center Section (Main Image and Title) */}
      <div className="flex flex-col items-center gap-6 mb-12 z-10" style={{marginTop: "-125%"}}>
        {/* Main building image */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img
            src="/splash3.jpeg"
            alt="Main Building"
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-1xl font-bold text-white text-center bg-gradient-to-r from-pink-400 to-orange-500 p-4 rounded-lg shadow-lg">
          LOGIN TO CAMPUS LOST & FOUND
        </h1>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-lg bg-white bg-opacity-90 absolute bottom-0 rounded-t-3xl p-8 shadow-xl transform translate-y-16 opacity-0 animate-slide-up-slow">
        <div className="flex flex-col gap-6">
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent border-2 border-gray-300 text-lg text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition duration-300"
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border-2 border-gray-300 text-lg text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition duration-300"
          />

          {/* Login Button */}
          <button className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105">
            Log In
          </button>

          {/* Google Login Button */}
          <button className="w-full flex items-center justify-center gap-4 py-3 rounded-lg bg-[#4285F4] text-white font-semibold text-lg shadow-lg hover:bg-[#357ae8] transition duration-300 ease-in-out transform hover:scale-105">
            {/* Google Icon */}
            <FaGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-pink-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
