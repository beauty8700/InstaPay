function Balance() {
  return (
    <div className="flex justify-between items-center bg-pink-400 text-white p-4  shadow-md">
      <div className="text-lg font-semibold">Your balance: ₹10,000</div>
      <button className="bg-white text-pink-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-pink-500 hover:text-white transition">
        Add Money
      </button>
    </div>
  );
}

export default Balance;
