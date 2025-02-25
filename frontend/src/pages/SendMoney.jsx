function SendMoney() {
  return (
    <div className="bg-gradient-to-br from-pink-100 to-purple-200 min-h-screen flex items-center justify-center p-4">
      <div className="w-96 bg-white/40 backdrop-blur-lg rounded-xl shadow-2xl p-6 flex flex-col items-center space-y-6 border border-white/20">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800">💸 Send Money</h2>

        {/* Receiver Section */}
        <div className="flex items-center space-x-4 bg-white/40 p-3 rounded-lg shadow-md w-full">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-500 font-bold shadow-lg text-lg">
            A
          </div>
          <div className="text-gray-700 font-semibold">Receiver Name</div>
        </div>

        {/* Amount Input */}
        <div className="w-full">
          <label className="block text-gray-700 text-sm mb-1 font-medium">
            Amount in ₹
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Enter amount"
          />
        </div>

        {/* Pay Button */}
        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-600 transition-transform transform hover:scale-105 duration-300">
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default SendMoney;
