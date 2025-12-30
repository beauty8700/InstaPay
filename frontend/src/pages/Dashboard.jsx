import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/balance", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setBalance(data.balance));
  }, []);

  return (
    <div className="pt-24 px-4 max-w-md mx-auto space-y-6">

      
      <div className="text-white p-6 rounded-2xl shadow-xl" style={{background: 'linear-gradient(to right, #6A89A7, #88BDF2)'}}>
        <p className="text-sm opacity-80">Available Balance</p>
        <h1 className="text-3xl font-bold mt-2">₹{balance}</h1>
      </div>

      
      <div className="grid grid-cols-4 gap-4 text-center">
        <Action icon="➕" label="Add" onClick={() => navigate("/Addmoney")} />
        <Action icon="💸" label="Pay" onClick={() => navigate("/Sendmoney")} />
        <Action icon="📄" label="History" onClick={() => navigate("/Transactions")} />
        <Action icon="👤" label="Profile" onClick={() => navigate("/Profile")} />
      </div>

      
      <div className="p-4 rounded-xl shadow border" style={{backgroundColor: '#384959', borderColor: '#6A89A7'}}>
        🎉 Get ₹50 cashback on first payment!
      </div>

      
      <div>
        <h3 className="font-semibold mb-2 text-white">Recent</h3>
        <div className="p-3 rounded-xl shadow border" style={{backgroundColor: '#384959', borderColor: '#6A89A7', color: '#BDDDFC'}}>Paid ₹500 to Rahul</div>
      </div>

    </div>
  );
}

function Action({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-xl shadow hover:scale-105 transition border"
      style={{backgroundColor: '#384959', borderColor: '#6A89A7'}}
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-xs mt-1" style={{color: '#BDDDFC'}}>{label}</p>
    </button>
  );
}

export default Dashboard;
