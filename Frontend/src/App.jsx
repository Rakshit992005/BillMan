import { Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Customer from "./pages/Customer";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/createinvoice" element={<CreateInvoice />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
