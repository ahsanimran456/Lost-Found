'use client';
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import NavigationBar from "../components/bottomNavigation";

const ProfileForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchUserFromFirebase = async () => {
    const uid = localStorage.getItem("uid");
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const firebaseUser = userDoc.data();
       const CheckUser = JSON.parse(localStorage.getItem("user"));
        if (!CheckUser) {
          localStorage.setItem("user", JSON.stringify(firebaseUser));
        }
        console.log(firebaseUser,"firebaseUser");
      } else {
        toast.error("User not found in Firebase.");
      }
    }
  };


  useEffect(() => {
    fetchUserFromFirebase();
  }, []);
  console.log(user,"asdasd");
  

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || ""); 
  const [classId, setClassId] = useState(user?.classId || "");
  const [section, setSection] = useState(user?.section || "");
  const [semester, setSemester] = useState(user?.semester || "");
  const [department, setDepartment] = useState(user?.department || "");
  const [program, setProgram] = useState(user?.program || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!user || !user.uid) {
      toast.error("User is not authenticated!");
      return;
    }

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);

      const updatedData = {
        name,
        email,
        classId,
        section,
        semester,
        department,
        program,
      };

      await setDoc(userRef, updatedData, { merge: true });
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 h-screen  p-6   mb-10">
      <form className="space-y-4 mt-10">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email ID</label>
          <input
            type="email"
            value={email}
            disabled
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
        {/* Class ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Class ID</label>
          <input
            type="text"
            onChange={(e) => setClassId(e.target.value)}
            value={classId}
            placeholder="Enter your class ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
        {/* Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <input
            type="text"
            onChange={(e) => setSection(e.target.value)}
            value={section}
            placeholder="Enter your class ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
       
        {/* Semester */}
        <div>
          <label className="block text-sm font-medium mb-1">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Semester</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
          </select>
        </div>
        {/* Department */}
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
           <option value="Business Administration">
              Business Administration
            </option>
            <option value="Accounting Banking Finance">
              Accounting Banking Finance
            </option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Artificial Intelligence & Mathematical Sciences">
              Artificial Intelligence & Mathematical Sciences
            </option>
            <option value="Media and Communication Studies">
              Media and Communication Studies
            </option>
            <option value="English">English</option>
            <option value="Social and Development Studies">
              Social and Development Studies
            </option>
            <option value="Education">Education</option>
            <option value="Environmental Sciences">
              Environmental Sciences
            </option>
          </select>
        </div>
        {/* Program */}
        <div className="mb-4" style={{marginBottom: "1rem"}}>
          <label className="block text-sm font-medium mb-1">Program</label>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Program</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        {/* Save Button */}
        <button
          type="button"
          onClick={handleUpdate}
          disabled={loading}
          className={`w-full py-2  text-white font-medium rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {loading ? "Updating..." : "Save"}
        </button>
      </form>
      <NavigationBar />

    </div>
  );
};

export default ProfileForm;
