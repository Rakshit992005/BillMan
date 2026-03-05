import { Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Customer from "./pages/Customer";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import RegisterPage from "./pages/ReisterPage";
import CustomerDetails from "./pages/CustomerDetails";


const App = () => {
  return (
    <div className="bg-(--bg-primary) h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/createinvoice" element={<CreateInvoice />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
