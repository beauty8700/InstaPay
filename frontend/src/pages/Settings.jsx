import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    biometric: false,
    darkMode: false,
    language: 'English',
    currency: 'INR'
  });
  const navigate = useNavigate();

  const handleSettingChange = (key, value) => {
    setSettings({...settings, [key]: value});
  };

  const handleSave = () => {
   
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="pt-24 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Settings</h2>
        <button
          onClick={() => navigate('/Profile')}
          className="text-pink-500 text-sm"
        >
          ← Back
        </button>
      </div>

      <div className="space-y-4">
        
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Push Notifications</h3>
              <p className="text-sm text-gray-600">Receive notifications for transactions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>
        </div>

        
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Biometric Login</h3>
              <p className="text-sm text-gray-600">Use fingerprint/face ID to login</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.biometric}
                onChange={(e) => handleSettingChange('biometric', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>
        </div>

        
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Dark Mode</h3>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>
        </div>

       
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Language</h3>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Currency</h3>
          <select
            value={settings.currency}
            onChange={(e) => handleSettingChange('currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
          </select>
        </div>

        
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">App Information</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Version: 1.0.0</p>
            <p>Last Updated: December 2025</p>
            <p>Developer: Beauty Kumari</p>
          </div>
        </div>
      </div>

      
      <button
        onClick={handleSave}
        className="w-full bg-pink-500 text-white py-3 rounded-xl"
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;