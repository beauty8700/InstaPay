import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successful! You can now login with your new password.');
        setFormData({ email: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => navigate('/SingIn'), 2000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{backgroundColor: '#F2F0EF'}}>
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 transform transition-all duration-300 hover:shadow-xl border" style={{borderColor: '#384959'}}>
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Forgot Password</h2>

        {error && <p className="text-red-400 text-center mb-4 bg-red-900 p-2 rounded">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4 bg-green-900 p-2 rounded">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                style={{backgroundColor: '#E8F0FE'}}
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                style={{backgroundColor: '#E8F0FE'}}
                placeholder="Enter new password"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border border-gray-600 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
                style={{backgroundColor: '#E8F0FE'}}
                placeholder="Rewrite password"
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{background: 'linear-gradient(to right, #6A89A7, #88BDF2)'}}
              onMouseEnter={(e) => !loading && (e.target.style.background = 'linear-gradient(to right, #5a7897, #78adef)')}
              onMouseLeave={(e) => !loading && (e.target.style.background = 'linear-gradient(to right, #6A89A7, #88BDF2)')}
            >
              {loading ? 'Saving...' : 'Save Password'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/SingIn')}
            className="text-sm font-medium transition-colors duration-200"
            style={{color: '#88BDF2'}}
            onMouseEnter={(e) => e.target.style.color = '#BDDDFC'}
            onMouseLeave={(e) => e.target.style.color = '#88BDF2'}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;