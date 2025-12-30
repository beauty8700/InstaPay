import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">

      
      <div className="max-w-md mx-auto mb-4">
        <button
          onClick={() => navigate("/Dashboard")}
          className="flex items-center gap-2 text-pink-600 font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-md mx-auto space-y-6">

        
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <div className="w-20 h-20 bg-pink-500 text-white rounded-full mx-auto flex items-center justify-center text-2xl font-bold">
            B
          </div>
          <h2 className="mt-2 font-semibold text-lg">Beauty Kumari</h2>
          <p className="text-gray-500 text-sm">beauty@gmail.com</p>
        </div>

        
        <Option title="🏦 Bank Accounts" onClick={() => navigate("/BankAccounts")} />
        <Option title="🪪 KYC Verification" onClick={() => navigate("/KYCVerification")} />
        <Option title="⚙️ Settings" onClick={() => navigate("/Settings")} />
        <Option title="🔒 Security" onClick={() => navigate("/Security")} />
        <Option title="❓ Help & Support" onClick={() => navigate("/HelpSupport")} />

       
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/SingIn");
          }}
          className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

function Option({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-2xl shadow cursor-pointer
                 flex items-center justify-between hover:bg-pink-50 transition"
    >
      <span className="font-medium">{title}</span>
      <span className="text-gray-400">›</span>
    </div>
  );
}

export default Profile;
