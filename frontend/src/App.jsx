import { BrowserRouter,Routes,Route } from "react-router-dom";
import SingUp from "./pages/SingUp.jsx";
import SignIn from "./pages/SingIn.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Send from "./pages/Send.jsx";
import AppBar from "./components/Appbar.jsx";
import SendMoney from "./pages/Sendmoney.jsx";
function App(){
  return(
<>
<BrowserRouter>
<AppBar/>

<Routes>
  <Route path="/SingUp" element={<SingUp/>} ></Route>
  <Route path="/SingIn" element={<SignIn/>}></Route>
  <Route path="/Sendmoney" element={<SendMoney/>}></Route>
  <Route path="/Dashboard" element={<Dashboard/>}></Route>
  <Route path="/Send" element={<Send/>}></Route>
</Routes>
</BrowserRouter>
</>
)}
export default App;