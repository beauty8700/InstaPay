import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SendMoney() {
  const [formData, setFormData] = useState({ to: '', amount: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/SingIn');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ to: formData.to, amount: parseFloat(formData.amount) })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Transfer successful');
        setFormData({ to: '', amount: '' });
      } else {
        setError(data.message || 'Transfer failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: '#F2F0EF'}}>
      <div className="w-96 bg-gray-800/40 backdrop-blur-lg rounded-xl shadow-2xl p-6 flex flex-col items-center space-y-6 border" style={{borderColor: '#384959'}}>
        <h2 className="text-2xl font-bold text-white">💸 Send Money</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1 font-medium">
              Recipient Username
            </label>
            <input
              type="email"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter recipient's email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1 font-medium">
              Amount in ₹
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter amount"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white font-semibold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
            style={{background: 'linear-gradient(to right, #6A89A7, #88BDF2)'}}
            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #5a7897, #78adef)'}
            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #6A89A7, #88BDF2)'}
          >
            Pay Now
          </button>
        </form>
        <button
          onClick={() => navigate('/Dashboard')}
          className="w-full text-gray-300 font-semibold py-2 rounded-lg shadow-lg hover:bg-gray-600 transition border border-gray-600"
          style={{backgroundColor: '#384959'}}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SendMoney;
