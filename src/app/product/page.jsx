const DetailedItemPage = () => {
    // Mock data for the item
    const item = {
      id: 6,
      name: 'Lost Phone',
      description: 'A phone left behind in a cafe.',
      time: 'November 22, 2024, 3:45 PM',
      location: 'Cafe ABC, Downtown',
      imageUrl: 'https://via.placeholder.com/400x300',
      status: 'Lost',
      userInfo: {
        name: 'John Doe',
        semester: '5th Semester',
        id: 'ID-123456',
        class: 'Computer Science',
        contact: 'johndoe@example.com',
      },
      claimGuidelines:
        'To claim the item, please provide proper identification and proof of ownership.',
      additionalNotes:
        'The item is currently held by the security office of the cafe.',
    };
  
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Image Section */}
        <div className="bg-[#2A2A72]">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-64 object-cover"
          />
        </div>
  
        {/* Content Section */}
        <div className="flex-grow p-4 space-y-6 overflow-auto pb-28">
          {/* Item Details */}
          <div className="bg-white shadow-md rounded-lg p-4 ">
            <h1 className="text-2xl font-bold text-[#2A2A72]">{item.name}</h1>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-semibold">Time Lost:</span> {item.time}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-semibold">Location:</span> {item.location}
            </p>
          </div>
  
          {/* User Information */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold text-[#2A2A72]">User Information</h2>
            <div className="mt-2 text-sm space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {item.userInfo.name}
              </p>
              <p>
                <span className="font-semibold">Semester:</span>{' '}
                {item.userInfo.semester}
              </p>
              <p>
                <span className="font-semibold">ID:</span> {item.userInfo.id}
              </p>
              <p>
                <span className="font-semibold">Class:</span> {item.userInfo.class}
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{' '}
                {item.userInfo.contact}
              </p>
            </div>
          </div>
  
          {/* Claim Guidelines Section */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold text-[#2A2A72]">Claim Guidelines</h2>
            <p className="text-sm text-gray-600 mt-2">{item.claimGuidelines}</p>
          </div>
  
          {/* Additional Notes Section */}
          {item.additionalNotes && (
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-bold text-[#2A2A72]">
                Additional Notes
              </h2>
              <p className="text-sm text-gray-600 mt-2">{item.additionalNotes}</p>
            </div>
          )}
        </div>
  
        {/* Chat Button Fixed */}
        <div className="fixed bottom-0 w-full   bg-white text-white pt-10 py-3 px-4 rounded-tl-3xl rounded-tr-3xl  shadow-2xl transition">
          <button className="w-full bg-[#2A2A72] rounded-md  py-4 bg-text-lg">Chat with Finder</button>
        </div>
      </div>
    );
  };
  
  export default DetailedItemPage;
  