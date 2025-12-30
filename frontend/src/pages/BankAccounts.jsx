import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BankAccounts() {
  const [banks, setBanks] = useState([
    { id: 1, name: "HDFC Bank", accountNumber: "****1234", type: "Savings" },
    { id: 2, name: "SBI Bank", accountNumber: "****5678", type: "Current" }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBank, setNewBank] = useState({
    name: '',
    accountNumber: '',
    type: 'Savings'
  });
  const navigate = useNavigate();

  const handleAddBank = () => {
    if (newBank.name && newBank.accountNumber) {
      const bank = {
        id: banks.length + 1,
        name: newBank.name,
        accountNumber: `****${newBank.accountNumber.slice(-4)}`,
        type: newBank.type
      };
      setBanks([...banks, bank]);
      setNewBank({ name: '', accountNumber: '', type: 'Savings' });
      setShowAddForm(false);
    }
  };

  const handleDeleteBank = (id) => {
    setBanks(banks.filter(bank => bank.id !== id));
  };

  return (
    <div className="pt-24 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Bank Accounts</h2>
        <button
          onClick={() => navigate('/Profile')}
          className="text-pink-500 text-sm"
        >
          ← Back
        </button>
      </div>

      
      <div className="space-y-3">
        {banks.map(bank => (
          <div key={bank.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{bank.name}</h3>
              <p className="text-sm text-gray-600">{bank.accountNumber} • {bank.type}</p>
            </div>
            <button
              onClick={() => handleDeleteBank(bank.id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-pink-500 text-white py-3 rounded-xl"
        >
          + Add New Bank Account
        </button>
      )}

      {showAddForm && (
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
          <h3 className="font-semibold">Add New Bank Account</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
            <input
              type="text"
              value={newBank.name}
              onChange={(e) => setNewBank({...newBank, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter bank name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <input
              type="text"
              value={newBank.accountNumber}
              onChange={(e) => setNewBank({...newBank, accountNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter account number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
            <select
              value={newBank.type}
              onChange={(e) => setNewBank({...newBank, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
              <option value="Salary">Salary</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddBank}
              className="flex-1 bg-pink-500 text-white py-2 rounded-lg"
            >
              Add Bank
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankAccounts; 