'use client';
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase"; // Firebase configuration
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the email is verified
      if (!user.emailVerified) {
        toast.error("Email not verified. Please verify your email to continue.");
        // Send verification email
        await sendEmailVerification(user);
        toast.success("Verification email sent. Please check your inbox.");
        return; 
      }

      // If verified, redirect to home
      toast.success("Login successful!");
      router.push("/home");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please check and try again.");
      }
      else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success("Google login successful!");
      router.push("/home");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-700 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Center Section */}
      <div className="flex flex-col items-center gap-6 mb-12 z-10" style={{ marginTop: "-125%" }}>
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img
            src="/splash3.jpeg"
            alt="Main Building"
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-3xl font-bold text-white text-center bg-gradient-to-r from-pink-400 to-orange-500 p-4 rounded-lg shadow-lg">
          LOGIN TO CAMPUS LOST & FOUND
        </h1>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-lg bg-white bg-opacity-90 absolute bottom-0 rounded-t-3xl p-8 shadow-xl transform translate-y-16 opacity-0 animate-slide-up-slow">
        <div className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-2 border-gray-300 text-lg text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition duration-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-2 border-gray-300 text-lg text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition duration-300"
          />

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            onClick={handleLogin}
            className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Log In
          </button>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-4 py-3 rounded-lg bg-[#4285F4] text-white font-semibold text-lg shadow-lg hover:bg-[#357ae8] transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
