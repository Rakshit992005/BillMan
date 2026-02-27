import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div>
        <Link to="/">
          <img src="/public/logo.png" alt="logo" />
        </Link>
        <h1>BillMan</h1>
      </div>

      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/customer">Customer</Link>
          </li>
          <li>
            <Link to="/invoices">Invoices</Link>
          </li>
          <li>
            <Link to="/createinvoice">Create Invoice</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;


