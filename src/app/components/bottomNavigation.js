import Link from 'next/link';

const NavigationBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-4">
      <div className="flex flex-col items-center">
        <Link href="/home">
          <span className="text-lg cursor-pointer">🏠</span>
        </Link>
        <span className="text-xs">Home</span>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/search">
          <span className="text-lg cursor-pointer">🔍</span>
        </Link>
        <span className="text-xs">Search</span>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/add">
          <span className="text-lg cursor-pointer">➕</span>
        </Link>
        <span className="text-xs">Add</span>
      </div>
      <div className="flex flex-col items-center">
        <Link href="/itemlist">
          <span className="text-lg cursor-pointer">📋</span>
        </Link>
        <span className="text-xs">List</span>
      </div>
    </div>
  );
};

export default NavigationBar;
