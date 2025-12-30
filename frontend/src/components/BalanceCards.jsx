function Balance() {
  return (
    <div className="flex justify-between items-center text-white p-4 shadow-md" style={{background: 'linear-gradient(to right, #6A89A7, #88BDF2)'}}>
      <div className="text-lg font-semibold">Your balance: ₹10,000</div>
      <button className="font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition" style={{backgroundColor: '#BDDDFC', color: '#384959'}}>
        Add Money
      </button>
    </div>
  );
}

export default Balance;
