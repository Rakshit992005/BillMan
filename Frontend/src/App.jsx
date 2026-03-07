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
import ProtectedRoutes from "./util/ProtectedRoutes.jsx";


const App = () => {
  return (
    <div className="bg-(--bg-primary) h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoutes children={<DashBoard />} />
        } />
        <Route path="/customer" element={
          <ProtectedRoutes children={<Customer />} />
        } />
        <Route path="/customer/:id" element={
          <ProtectedRoutes children={<CustomerDetails />} />
        } />
        <Route path="/invoices" element={
          <ProtectedRoutes children={<Invoices />} />
        } />
        <Route path="/createinvoice" element={
          <ProtectedRoutes children={<CreateInvoice />} />
        } />
        <Route path="/profile" element={
          <ProtectedRoutes children={<Profile />} />
        } />
      </Routes>
    </div>
  );
};

export default App;
