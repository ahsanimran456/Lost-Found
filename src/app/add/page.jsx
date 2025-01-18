"use client";
import React, { useState } from "react";
import { FaWallet, FaBook, FaPhone, FaGlasses, FaKey, FaHatCowboy } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Select from "react-select";
import NavigationBar from "../components/bottomNavigation";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";

const LostAndFoundForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const items = [
    { id: 2, name: "ID Card", status: "Lost and Found", icon: <FaWallet /> },
    { id: 3, name: "Found Notebook", status: "Lost and Found", icon: <FaBook /> },
    { id: 4, name: "Lost Wallet", status: "Lost and Found", icon: <FaWallet /> },
    { id: 5, name: "Found Watch", status: "Lost and Found", icon: <MdWatch /> },
    { id: 6, name: "Lost Phone", status: "Lost and Found", icon: <FaPhone /> },
    { id: 7, name: "Found Glasses", status: "Lost and Found", icon: <FaGlasses /> },
    { id: 8, name: "Lost Keys", status: "Lost and Found", icon: <FaKey /> },
    { id: 9, name: "Lost Bag", status: "Lost and Found", icon: <IoBagCheckOutline /> },
    { id: 12, name: "Found Hat", status: "Lost and Found", icon: <FaHatCowboy /> },
    { id: 14, name: "Found Phone", status: "Lost and Found", icon: <FaPhone /> },
  ];

  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Lost");

  const handleSubmit = async () => {
    if (!product || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, "items"), {
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        userClassID: user.classId,
        product,
        description,
        type,
        timestamp: new Date(),
      });

      toast.success("Your add posted successfully!");
      console.log("Document written with ID: ", docRef.id);
    
      setProduct("");
      setDescription("");
      setType("Lost");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to post add. Please try again.");
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "indigo",
      borderRadius: "0.375rem",
      padding: "0.3rem",
      boxShadow: "none",
      "&:hover": { borderColor: "blue" },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#E0E7FF" : "white",
      color: state.isFocused ? "#3730A3" : "black",
      padding: "10px",
    }),
  };

  const productOptions = items.map((item) => ({
    value: item.name,
    label: (
      <div className="flex items-center">
        <span className="mr-2">{item.icon}</span>
        {item.name}
      </div>
    ),
  }));

  const typeOptions = [
    { value: "Lost", label: "Lost" },
    { value: "Found", label: "Found" },
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-200 h-screen p-6 mb-10">
      <form className="space-y-4 mt-10">
        {/* Product Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Product</label>
          <Select
            options={productOptions}
            value={product ? { label: product, value: product } : null}
            onChange={(selected) => setProduct(selected.value)}
            styles={customStyles}
            placeholder="Select a product"
            isClearable
            className="w-full"
          />
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <Select
            options={typeOptions}
            value={type ? { label: type, value: type } : null}
            onChange={(selected) => setType(selected.value)}
            styles={customStyles}
            placeholder="Select type"
            className="w-full"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md"
        >
          Post Item
        </button>
      </form>
      <NavigationBar />
    </div>
  );
};

export default LostAndFoundForm;
