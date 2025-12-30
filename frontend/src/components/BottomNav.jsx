import { useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 w-full border-t shadow flex justify-around py-2" style={{backgroundColor: '#e2e7ebff', borderColor: '#6A89A7'}}>
      <Nav icon="🏠" label="Home" onClick={() => navigate("/Dashboard")} />
      <Nav icon="💸" label="Pay" onClick={() => navigate("/Sendmoney")} />
      <Nav icon="💸" label="Send" onClick={() => navigate("/SendMoney")} />
      <Nav icon="👤" label="Profile" onClick={() => navigate("/Profile")} />
    </div>
  );
}

function Nav({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="text-center text-sm transition-colors hover:text-blue-800" style={{color: '#1d3246ff'}}>
      <div>{icon}</div>
      {label}
    </button>
  );
}

export default BottomNav;
