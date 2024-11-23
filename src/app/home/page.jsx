import React from 'react'
import NavigationBar from '../components/bottomNavigation';

const page = () => {
    const items = [
        { id: 1, name: 'Lost Item', status: 'Lost', icon: '🎒' },
        { id: 2, name: 'ID Card', status: 'Lost and Found', icon: '🆔' },
        { id: 3, name: 'Found Notebook', status: 'Found', icon: '📓' },
        { id: 4, name: 'Lost Wallet', status: 'Lost', icon: '👛' },
        { id: 5, name: 'Found Watch', status: 'Found', icon: '⏰' },
        { id: 6, name: 'Lost Phone', status: 'Lost', icon: '📱' },
        { id: 7, name: 'Found Glasses', status: 'Found', icon: '👓' },
        { id: 8, name: 'Lost Keys', status: 'Lost', icon: '🔑' },
        { id: 9, name: 'Lost Bag', status: 'Lost', icon: '👜' },
        { id: 10, name: 'Found Shoes', status: 'Found', icon: '👟' },
        { id: 11, name: 'Lost Watch', status: 'Lost', icon: '⌚' },
        { id: 12, name: 'Found Hat', status: 'Found', icon: '🎩' },
        { id: 13, name: 'Lost Wallet', status: 'Lost', icon: '👛' },
        { id: 14, name: 'Found Phone', status: 'Found', icon: '📱' }
      ];
      

  return (
    <div className="h-screen bg-gray-200 flex flex-col">
      {/* Top Heading (Fixed Position) */}
      <div className="p-6 bg-gray-800 text-white text-center fixed top-0 left-0 w-full z-10">
        <h1 className="text-2xl font-bold">LOST & FOUND</h1>
        <p className="mt-2 text-lg">View Found Items</p>
      </div>

      {/* Items Section (Scrollable Area) */}
      <div className="flex-grow bg-gray-200 p-6 pt-36 pb-28 overflow-auto">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg flex flex-col items-center justify-center p-4 text-center"
            >
              <div className="text-4xl">{item.icon}</div>
              <h2 className="mt-2 text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar />
    </div>
  );
}

export default page;
