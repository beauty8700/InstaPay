import React from "react";

function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign Up</h2>
        <form>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-200"
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-200"
                placeholder="Enter your last name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-200"
                placeholder="Choose a username"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-200"
                placeholder="Create a password"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-pink-600 transform transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium border border-gray-200 hover:bg-gray-100 transform transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-pink-500 font-medium hover:text-pink-600 hover:underline transition-colors duration-200">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;