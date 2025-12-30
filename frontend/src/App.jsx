import { BrowserRouter, Routes, Route } from "react-router-dom";

import SingUp from "./pages/SingUp.jsx";
import SingIn from "./pages/SingIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Send from "./pages/Send.jsx";
import SendMoney from "./pages/SendMoney.jsx";
import Addmoney from "./pages/Addmoney.jsx";
import Profile from "./pages/Profile.jsx";
import Transactions from "./pages/Transactions.jsx";
import BankAccounts from "./pages/BankAccounts.jsx";
import KYCVerification from "./pages/KYCVerification.jsx";
import Settings from "./pages/Settings.jsx";
import Security from "./pages/Security.jsx";
import HelpSupport from "./pages/HelpSupport.jsx";

import Appbar from "./components/Appbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Appbar />

      <Routes>
        
        <Route path="/" element={<SingIn />} />
        <Route path="/SingUp" element={<SingUp />} />
        <Route path="/SingIn" element={<SingIn />} />

       
        <Route path="/Dashboard" element={<Dashboard />} />

       
        <Route path="/Send" element={<Send />} />
        <Route path="/Sendmoney" element={<SendMoney />} />
        <Route path="/Addmoney" element={<Addmoney />} />

       
        <Route path="/Profile" element={<Profile />} />
        <Route path="/BankAccounts" element={<BankAccounts />} />
        <Route path="/KYCVerification" element={<KYCVerification />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Security" element={<Security />} />
        <Route path="/HelpSupport" element={<HelpSupport />} />

        
        <Route path="/Transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
