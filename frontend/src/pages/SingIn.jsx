import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SingIn() {
  const [formData, setFormData] = useState({
    Username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    const savedPassword = localStorage.getItem('rememberedPassword');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe && savedUsername && savedPassword) {
      setFormData({
        Username: savedUsername,
        password: savedPassword
      });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/Dashboard");
      } else {
        if (data.message === 'Invalid credentials') {
          setError('You are not signed up yet. Please sign up first.');
        } else {
          setError(data.message || 'Login failed');
        }
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleCancel = () => {
    setFormData({
      Username: '',
      password: ''
    });
    setRememberMe(false);
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: '#F2F0EF'}}>
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 transform transition-all duration-300 hover:shadow-xl border" style={{borderColor: '#384959'}}>
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <input
                type="email"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                placeholder="Enter your username"
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
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="w-4 h-4 text-blue-400 border-gray-600 rounded focus:ring-blue-400 bg-gray-700"
                />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>

              <a
                href="/forgot-password"
                className="text-sm hover:underline transition-colors duration-200"
                style={{color: '#88BDF2'}}
                onMouseEnter={(e) => e.target.style.color = '#BDDDFC'}
                onMouseLeave={(e) => e.target.style.color = '#88BDF2'}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 text-white py-3 px-6 rounded-lg font-medium transform transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              style={{background: 'linear-gradient(to right, #6A89A7, #88BDF2)'}}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #5a7897, #78adef)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #6A89A7, #88BDF2)'}
            >
              Login
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
          Don't have an account?{' '}
          <a
            href="/SingUp"
            className="font-medium hover:underline transition-colors duration-200"
            style={{color: '#88BDF2'}}
            onMouseEnter={(e) => e.target.style.color = '#BDDDFC'}
            onMouseLeave={(e) => e.target.style.color = '#88BDF2'}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SingIn;