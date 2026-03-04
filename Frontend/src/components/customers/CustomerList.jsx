import React, { useState, useEffect } from "react";
import CustomerListItem from "./CustomerListItem";
import axios from "axios";

const CustomerList = () => {
  // Mock data based on the requested structure
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Alexander Wright",
      email: "alex.wright@techflow.io",
      mobile: "+1 (555) 123-4567",
      paidAmount: 12450.0,
      unpaidAmount: 0.0,
      totalAmount: 12450.0,
    },
    {
      id: 2,
      name: "Sophia Martinez",
      email: "s.martinez@creative-sol.com",
      mobile: "+1 (555) 987-6543",
      paidAmount: 8200.5,
      unpaidAmount: 1500.0,
      totalAmount: 9700.5,
    },
  ]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/customer/get-all-customers/`,
          { withCredentials: true },
        );
        // console.log(response.data);
        setCustomers(response.data.customers);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchCustomers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100/60 shadow-xl shadow-gray-200/40 overflow-hidden">
      {/* Top Toolbar */}
      <div className="px-10 py-8 flex items-center border-b border-gray-50/50">
        <div className="relative flex-1 group max-w-xl">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gray-50/30 border border-gray-100 rounded-2xl text-[15px] font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all duration-300"
          />
        </div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-4 px-10 py-5 bg-gray-50/10 border-b border-gray-50">
        <span className="text-[13px] font-black text-gray-400 uppercase tracking-widest">
          Customer Name
        </span>
        <span className="text-[13px] font-black text-gray-400 uppercase tracking-widest">
          Paid Amount
        </span>
        <span className="text-[13px] font-black text-gray-400 uppercase tracking-widest">
          Unpaid Amount
        </span>
        <span className="text-[13px] font-black text-gray-400 uppercase tracking-widest">
          Total Billing
        </span>
      </div>

      {/* List Items Mapping */}
      <div className="divide-y divide-gray-50">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <CustomerListItem
              key={customer._id}
              name={customer.name}
              email={customer.email}
              paidAmount={customer.paidAmount}
              unpaidAmount={customer.unpaidAmount}
              totalAmount={customer.totalAmount}
            />
          ))
        ) : (
          <div className="px-10 py-20 text-center text-gray-400 font-medium">
            No customers found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
