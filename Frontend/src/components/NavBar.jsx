import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-(--text-primary) font-bold border-b-2 border-(--text-primary) pb-1"
      : "hover:text-(--text-primary) transition-colors pb-1";

  return (
    <div className="bg-(--bg-primary) border-b-2 border-(--border-primary) text-(--text-primary) p-2 flex justify-between sticky top-0 items-center z-50 w-full">
      <div className="flex items-center text-2xl font-semibold">
        <Link to="/">
          <img src="/img/logo.png" alt="logo" height={50} width={50} />
        </Link>
        <Link to="/">
          <h1>BillMan</h1>
        </Link>
      </div>

      <div className="">
        <ul className={`flex pr-5 gap-5 text-(--text-secondary) items-center`}>
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer" className={navLinkClass}>
              Customer
            </NavLink>
          </li>
          <li>
            <NavLink to="/invoices" className={navLinkClass}>
              Invoices
            </NavLink>
          </li>
          <li>
            <NavLink to="/createinvoice" className={navLinkClass}>
              Create Invoice
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-500 transition-colors pb-1"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={navLinkClass}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
