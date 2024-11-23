import React from 'react';
import Link from 'next/link';
import NavigationBar from '../components/bottomNavigation';

const Page = () => {
  const items = [
    { id: 1, name: 'Lost Item', description: 'Description of the lost item', imageUrl: 'https://via.placeholder.com/100', status: 'Lost' },
    { id: 2, name: 'ID Card', description: 'Lost ID Card found', imageUrl: 'https://via.placeholder.com/100', status: 'Found' },
    { id: 3, name: 'Found Notebook', description: 'Found a notebook with notes', imageUrl: 'https://via.placeholder.com/100', status: 'Found' },
    { id: 4, name: 'Lost Wallet', description: 'A wallet with ID and cards inside', imageUrl: 'https://via.placeholder.com/100', status: 'Lost' },
    { id: 5, name: 'Found Watch', description: 'A wristwatch found in the park', imageUrl: 'https://via.placeholder.com/100', status: 'Found' },
    { id: 6, name: 'Lost Phone', description: 'A phone left behind in a cafe', imageUrl: 'https://via.placeholder.com/100', status: 'Lost' },
    { id: 7, name: 'Found Glasses', description: 'Description of the lost item', imageUrl: 'https://via.placeholder.com/100', status: 'Found' },
    { id: 8, name: 'Lost Keys', description: 'Description of the lost item', imageUrl: 'https://via.placeholder.com/100', status: 'Lost' },
  ];

  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      {/* Top Heading (Fixed Position) */}
      <div className="p-6 bg-gray-800 text-white text-center fixed top-0 left-0 w-full z-10">
        <h1 className="text-2xl font-bold">LOST & FOUND</h1>
        <p className="mt-2 text-lg">View Lost and Found Items</p>
      </div>

      {/* Items Section (Scrollable Area) */}
      <div className="flex-grow bg-gray-200 p-2 pt-36 pb-28 overflow-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link href={`/product`} key={item.id}>
              <div
                className="bg-gray-700 text-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                {/* Tag on top of the card */}
                <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase z-10">
                  {item.status}
                </div>

                {/* Card Image */}
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover mx-auto mt-12 rounded-full" />

                {/* Card Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="mt-2 text-sm text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar />
    </div>
  );
};

export default Page;
