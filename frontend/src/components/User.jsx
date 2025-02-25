function User() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/40 backdrop-blur-lg rounded-lg shadow-2xl p-6 space-y-6 border border-white/20">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">💁‍♂️ Users</h2>

        {/* Search Input */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search for users..."
            className="w-full px-4 py-3 rounded-lg border-none text-gray-700 shadow-md focus:ring-2 focus:ring-pink-500 outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-400">🔍</span>
        </div>

        {/* User List */}
        <div className="space-y-4">
          {[1, 2, 3].map((user) => (
            <div key={user} className="flex justify-between items-center bg-white/80 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="w-12 h-12 flex items-center justify-center bg-pink-500 text-white font-bold rounded-full shadow-lg">
                  A
                </div>
                {/* User Name */}
                <div className="text-gray-800 font-medium text-lg">User Name</div>
              </div>

              {/* Send Money Button */}
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 transition-transform transform hover:scale-105">
                💰 Send Money
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
