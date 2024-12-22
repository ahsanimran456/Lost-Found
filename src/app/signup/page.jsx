// 'use client';
// import React, { useState } from "react";
// import { FaGoogle } from "react-icons/fa"; // Google icon from react-icons
// import { auth } from "../firebase"; // Import Firebase config
// import { createUserWithEmailAndPassword,sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Firebase auth methods
// import { useRouter } from "next/navigation";  // for redirecting after login
// import toast from "react-hot-toast";

// const SignupScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSignup = async () => {
//     try {
//     const response =  await createUserWithEmailAndPassword(auth, email, password);
//     console.log(response,"response");
//         if(response?.user){
//          toast.success('Please verify your email');
//         //  const userVerfication = await sendEmailVerification(response.user); 
//          console.log(userVerfication,"userVerfication");
//             // router.push('/pincode')
//         }
//     //   router.push("/dashboard"); 
//     } catch (err) {
//       setError("Invalid credentials");
//       console.log(err.message,"errerr");
//       if(err.message=='page.jsx:28 Firebase: Error (auth/email-already-in-use).'){
//           toast.error('Email already in use');
//       }else{
//           toast.error(err.message);
//       }
//     }
//   };

//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//      const response = await signInWithPopup(auth, provider);
//      console.log(response,"response");
     
//     //   router.push("/dashboard"); // redirect to dashboard after successful Google login
//     } catch (err) {
//       setError("Google login failed");
//     }
//   };

//   return (
//     <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-700 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
//       {/* Center Section (Main Image and Title) */}
//       <div className="flex flex-col items-center gap-6 mb-12 z-10" style={{ marginTop: "-125%" }}>
//         <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
//           <img
//             src="/splash3.jpeg"
//             alt="Main Building"
//             className="object-cover w-full h-full"
//           />
//         </div>
//         <h1 className="text-3xl font-bold text-white text-center bg-gradient-to-r from-pink-400 to-orange-500 p-4 rounded-lg shadow-lg">
//           SignUp TO CAMPUS LOST & FOUND
//         </h1>
//       </div>

//       {/* Form Section */}
//       <div className="w-full max-w-lg bg-white bg-opacity-90 absolute bottom-0 rounded-t-3xl p-8 shadow-xl transform translate-y-16 opacity-0 animate-slide-up-slow">
//         <div className="flex flex-col gap-6">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full bg-transparent border-2 border-gray-300 text-lg text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition duration-300"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full bg-transparent border-2 border-gray-300 text-lg text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 transition duration-300"
//           />

//           {/* Error Message */}
//           {error && <div className="text-red-500 text-sm">{error}</div>}

//           <button
//             onClick={handleSignup}
//             className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Sign Up
//           </button>

//           {/* Google Login Button */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-4 py-3 rounded-lg bg-[#4285F4] text-white font-semibold text-lg shadow-lg hover:bg-[#357ae8] transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             <FaGoogle className="text-xl" />
//             <span>Sign in with Google</span>
//           </button>

//           <div className="text-center mt-4">
//             <a href="#" className="text-pink-600 text-sm hover:underline">
//               Forgot Password?
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupScreen;

"use client";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import { db } from "../firebase"; // Import Firestore instance
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (!emailVerified && !user.emailVerified) {
          const interval = setInterval(async () => {
            await user.reload(); 
            if (user.emailVerified) {
              setEmailVerified(true);
              toast.success("Email verified successfully!");
              router.push("/home");
              clearInterval(interval);
            }
          }, 3000); // Check every 3 seconds
          return () => clearInterval(interval); // Cleanup
        }
      }
    });
    return () => unsubscribe();
  }, [emailVerified, router]);

  const saveUserDataToFirestore = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid); // Reference to Firestore document
      await setDoc(userRef, {
        email: user.email,
        createdAt: new Date(),
      });
    } catch (err) {
      toast.error("Failed to save user data.");
    }
  };

  const handleSignup = async () => {
    if (!email || !password)
      return toast.error("Please enter email and password");
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response?.user) {
        setUser(response.user);
        toast.success("Signup successful! Please verify your email.");
        await sendEmailVerification(response.user);
        await saveUserDataToFirestore(response.user); // Save user data to Firestore
      }
    } catch (err) {
      if (err.message.includes("auth/email-already-in-use")) {
        toast.error("Email already in use. Try logging in.");
      } else if (err.message.includes("auth/weak-password")) {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      if (response?.user) {
        if (response.user.emailVerified) {
          toast.success("Login successful!");
          router.push("/home");
        } else {
          toast.info("Please verify your email before proceeding.");
        }
        setUser(response.user);
        await saveUserDataToFirestore(response.user); // Save Google user data to Firestore
      }
    } catch (err) {
      toast.error("Google login failed.");
      setError("Google login failed.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-700 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      <div className="flex flex-col items-center gap-6 mb-12 z-10" style={{ marginTop: "-125%" }}>
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img src="/splash3.jpeg" alt="Main Building" className="object-cover w-full h-full" />
        </div>
        <h1 className="text-3xl font-bold text-white text-center bg-gradient-to-r from-pink-400 to-orange-500 p-4 rounded-lg shadow-lg">
          Sign Up to Campus Lost & Found
        </h1>
      </div>

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

          <button
            onClick={handleSignup}
            className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>

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

export default SignupScreen;
