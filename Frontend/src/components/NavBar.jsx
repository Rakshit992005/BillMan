import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-(--bg-primary) border-b-2 border-(--border-primary) text-(--text-primary) p-2 flex justify-between  items-center">
      <div className="flex items-center  text-2xl font-semibold">
        <Link to="/">
          <img src="/logo.png" alt="logo" height={50} width={50}/>
        </Link>
        <Link to="/">
          <h1>BillMan</h1>
        </Link>
        
      </div>

      <div className="">
        <ul className={`flex  pr-5 gap-5 text-(--text-secondary)`}>
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
