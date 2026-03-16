import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvoiceList from "../components/invoices/InvoiceList";
import UpdateCustomerDetails from "../components/UpdateCustomerDetails";
import axios from "axios";

const StatCard = ({ label, amount, accentColor }) => {
  return (
    <div
      className={`p-6 bg-white border border-primary/20 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden group border-l-4 ${accentColor}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500 blur-2xl opacity-50" />
      <h3 className="text-sm font-bold text-(--text-secondary) uppercase tracking-wider mb-2">
        {label}
      </h3>
      <p className="text-3xl font-bold text-dark">
        ₹{amount?.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const CustomerDetails = () => {
  const { id } = useParams();

  const [isUpdating, setIsUpdating] = useState(false);

  const [customer, setCustomer] = useState({
    name: "Loading...",
    email: "Loading...",
    mobile: "Loading...",
    address: "Loading...",
    paidAmount: 0,
    unpaidAmount: 0,
    totalAmount: 0,
  });

  const [invoices, setInvoices] = useState([
    {
      invoiceNumber: "",
      date: "",
      totalAmount: 0,
      status: "",
    },
  ]);

  const apiCall = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/customer/get-customer/${id}`,
        { withCredentials: true },
      );
      setCustomer(response.data.customer);
      setInvoices(response.data.invoices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleStatusChange = async (invoiceId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/invoice/${invoiceId}/paid`,
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        // Re-fetch customer data to update the "Amount Paid" / "Unpaid Balance" stats
        apiCall();
      }
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  };

  const handleDelete = async (invoiceId) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/invoice/${invoiceId}/delete`,
          { withCredentials: true },
        );
        if (response.status === 200) {
          // Re-fetch customer data to update everything
          apiCall();
        }
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-fade-in">
      {/* Customer Header Section */}
      <div className="bg-white p-8 rounded-xl border border-primary/20 shadow-xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-tr from-primary/20 to-transparent -mt-20 -mr-20 rounded-full group-hover:scale-110 transition-transform duration-700 blur-3xl opacity-40 animate-pulse" />
        <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
          <div className="w-24 h-24 bg-primary text-white font-bold text-4xl flex items-center justify-center rounded-2xl shadow-lg shadow-primary/30 group-hover:-rotate-6 transition-transform">
            {customer?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl font-extrabold text-dark tracking-tight">
              {customer?.name?.toUpperCase()}
            </h1>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <div className="flex items-center gap-2 text-(--text-secondary)">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {customer?.email}
              </div>
              <div className="flex items-center gap-2 text-(--text-secondary)">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +91 {customer?.mobile}
              </div>
              <div className="flex items-center gap-2 text-(--text-secondary)">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {customer?.address}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsUpdating(true)}
              className="px-6 py-2.5 bg-primary text-white font-bold rounded-md shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Update Details
            </button>
          </div>
        </div>
      </div>

      {isUpdating && customer && (
        <UpdateCustomerDetails
          customer={customer}
          onClose={() => setIsUpdating(false)}
          onUpdateSuccess={apiCall}
        />
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          label="Total Business"
          amount={customer?.totalAmount}
          accentColor="border-l-primary"
        />
        <StatCard
          label="Amount Paid"
          amount={customer?.paidAmount}
          accentColor="border-l-emerald-500"
        />
        <StatCard
          label="Unpaid Balance"
          amount={customer?.unpaidAmount}
          accentColor="border-l-rose-500 text-rose-600"
        />
      </div>

      {/* Invoices List Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-primary/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark">Invoice Activity</h2>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 group hover:gap-3 transition-all">
            View All Invoices
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>

        <InvoiceList
          invoices={invoices}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
