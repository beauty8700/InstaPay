import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    First_name: '',
    Last_name: '',
    Username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleCancel = () => {
    setFormData({
      First_name: '',
      Last_name: '',
      Username: '',
      password: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/SingIn');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: '#F2F0EF'}}>
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 transform transition-all duration-300 hover:shadow-xl border" style={{borderColor: '#384959'}}>
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Sign Up</h2>
        {error && <p className="text-red-400 text-center mb-4 bg-red-900 p-2 rounded">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">First Name</label>
              <input
                type="text"
                name="First_name"
                value={formData.First_name}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                style={{backgroundColor: '#E8F0FE'}}
                placeholder="Enter your first name"
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Last Name</label>
              <input
                type="text"
                name="Last_name"
                value={formData.Last_name}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                style={{backgroundColor: '#E8F0FE'}}
                placeholder="Enter your last name"
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <input
                type="email"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                style={{backgroundColor: '#E8F0FE'}}
                placeholder="Choose a username"
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                style={{backgroundColor: '#E8F0FE'}}
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              style={{background: 'linear-gradient(to right, #6A89A7, #88BDF2)'}}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #5a7897, #78adef)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #6A89A7, #88BDF2)'}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 text-gray-300 py-3 px-6 rounded-lg font-medium border border-gray-600 hover:bg-gray-600 transform transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              style={{backgroundColor: '#384959'}}
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <a href="/SingIn" className="font-medium hover:underline transition-colors duration-200" style={{color: '#88BDF2'}} onMouseEnter={(e) => e.target.style.color = '#BDDDFC'} onMouseLeave={(e) => e.target.style.color = '#88BDF2'}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;