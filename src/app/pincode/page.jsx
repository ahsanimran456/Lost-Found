'use client';
import React, { useState } from "react";
import { auth } from "../firebase"; // Firebase config import
import { sendEmailVerification } from "firebase/auth"; // Firebase methods
import { useRouter } from "next/navigation"; // Router for navigation

const PincodeScreen = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Check if the email is verified
  const checkVerification = async () => {
    const user = auth.currentUser;
    await user.reload(); // Refresh user data
    if (user.emailVerified) {
      setIsVerified(true);
      router.push("/dashboard"); // Redirect after successful verification
    } else {
      setError("Email not verified yet. Please check your inbox.");
    }
  };

  // Resend email verification
  const resendVerificationEmail = async () => {
    const user = auth.currentUser;
    try {
      await sendEmailVerification(user);
      setError("Verification email sent again. Check your inbox.");
    } catch {
      setError("Failed to send verification email. Try again.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-700 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Main Section */}
      <div className="flex flex-col items-center gap-6 p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Verify Your Email
        </h1>

        {/* Verification Status */}
        {error && (
          <div className="text-red-500 text-center bg-red-100 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Check Verification Button */}
        <button
          onClick={checkVerification}
          className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Check Verification
        </button>

        {/* Resend Email Button */}
        <button
          onClick={resendVerificationEmail}
          className="w-full py-3 px-6 bg-gray-600 text-white rounded-lg text-lg font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105"
        >
          Resend Verification Email
        </button>

        {/* Success Message */}
        {isVerified && (
          <div className="text-green-600 text-lg text-center mt-4">
            Your email is verified! Redirecting to dashboard...
          </div>
        )}
      </div>
    </div>
  );
};

export default PincodeScreen;
