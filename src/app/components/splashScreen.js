// import Image from "next/image";
// import React from "react";

// const SplashScreen = () => {
//     return (
//         <div className="h-screen bg-gray-800 flex flex-col items-center justify-between py-6">
//             {/* Top section */}
//             <div className="w-full flex justify-between items-center px-6">
//                 {/* Placeholder for profile icon */}
//                 <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
//                 {/* Placeholder for settings icon */}
//                 <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
//             </div>

//             {/* Center Section (Main Image and Title) */}
//             <div className="flex flex-col items-center gap-5">
//                 {/* Main building image */}
//                 <div className="relative w-48 h-48">
//                     <Image
//                         src="/splash3.jpeg"
//                         alt="Main Building"
//                         className="rounded-full object-cover"
//                         layout="fill" // This will ensure the image fills the container while keeping the aspect ratio
//                     />
//                 </div>
//                 <h1 className="text-2xl font-bold bg-[#EFF0DE] text-gray-700 text-center animate-zoom-gradient p-4 rounded-lg">
//                     CAMPUS LOST & FOUND
//                 </h1>
//             </div>

//             {/* Buttons Section */}
//             <div className="w-full flex flex-col items-center gap-4 px-6">
//                 <button className="w-full bg-white text-black py-3 rounded-lg text-lg font-medium">
//                     Report Lost Item
//                 </button>
//                 <button className="w-full bg-white text-black py-3 rounded-lg text-lg font-medium">
//                     Update Info
//                 </button>
//                 <button className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-medium  active:bg-pink-400">
//   Continue
// </button>
//             </div>
//         </div>
//     );
// };

// export default SplashScreen;



import Image from "next/image";
import Link from "next/link";
import React from "react";

const SplashScreen = () => {
    return (
        <div className="h-screen bg-gradient-to-r from-indigo-500 to-purple-700 flex flex-col items-center justify-between py-6">
            {/* Top section */}
            <div className="w-full flex justify-between items-center px-6">
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
            </div>

            {/* Center Section */}
            <div className="flex flex-col items-center gap-5">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                        src="/splash3.jpeg"
                        alt="Main Building"
                        className="object-cover"
                        layout="fill"
                    />
                </div>
                <Link href={"/login"}>
                <h1 className="text-2xl font-bold bg-[#EFF0DE] text-gray-700 text-center animate-zoom-gradient p-4 rounded-lg">
                    CAMPUS LOST & FOUND
                </h1>
                </Link>
            </div>

            {/* Buttons Section */}
            <div className="w-full max-w-sm flex flex-col items-center gap-4 px-6">
                <button className="w-full bg-white text-gray-800 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition duration-300">
                    Report Lost Item
                </button>
                {/* <button className="w-full bg-white text-gray-800 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition duration-300">
                    Update Info
                </button> */}

                <Link href={"/login"} className="w-full">
                <button className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-pink-500 transition duration-300">
                    Continue
                </button>
                </Link>
            </div>
        </div>
    );
};

export default SplashScreen;

