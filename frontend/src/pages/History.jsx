import { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import BottomNav from "../components/BottomNav";

function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const fetchTransactionHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/account/transactions", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      } else {
        setError("Failed to fetch transaction history");
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#1A1F2E'}}>
        <Appbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p style={{color: '#BDDDFC'}}>Loading transaction history...</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#1A1F2E'}}>
      <div className="max-w-md mx-auto mb-4">
        <button
          onClick={() => navigate("/Dashboard")}
          className="flex items-center gap-2 text-pink-600 font-semibold"
        >
          ← Back
        </button>
      </div>
      <Appbar />

      <div className="container mx-auto px-4 py-8 pt-24">
        
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl font-bold mb-8 text-center"
            style={{color: '#88BDF2'}}
          >
            Transaction History
          </h1>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#BDDDFC'}}>
                No transactions yet
              </h3>
              <p className="text-gray-400">
                Your transaction history will appear here once you start sending or receiving money.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          transaction.type === 'sent'
                            ? 'bg-red-600'
                            : 'bg-green-600'
                        }`}>
                          {transaction.type === 'sent' ? '↑' : '↓'}
                        </div>
                        <div>
                          <h3 className="font-semibold" style={{color: '#BDDDFC'}}>
                            {transaction.type === 'sent' ? 'Sent to' : 'Received from'} {transaction.otherParty.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {transaction.otherParty.username}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-2">
                        {transaction.description}
                      </p>

                      <p className="text-xs text-gray-500">
                        {formatDate(transaction.timestamp)}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className={`text-xl font-bold ${
                        transaction.type === 'sent'
                          ? 'text-red-400'
                          : 'text-green-400'
                      }`}>
                        {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default History;