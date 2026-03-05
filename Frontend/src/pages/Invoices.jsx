import React, { useEffect, useState } from "react";
import InvoiceList from "../components/invoices/InvoiceList";
import axios from "axios";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/invoice/status/${filter}`,
          { withCredentials: true },
        );
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [filter]);

  const handleStatusChange = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/invoice/${id}/paid`,
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        setInvoices(
          invoices.map((inv) =>
            inv._id === id ? { ...inv, status: "paid" } : inv,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/invoice/${id}/delete`,
          { withCredentials: true },
        );
        if (response.status === 200) {
          setInvoices(invoices.filter((inv) => inv._id !== id));
        }
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-xl text-(--text-secondary) animate-pulse">
          Loading Invoices...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-primary/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-dark tracking-tight">
            Invoices
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-(--text-secondary)"
          >
            Filter by Status:
          </label>
          <div className="relative">
            <select
              id="status-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-white border border-primary/20 rounded-lg text-dark font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 hover:border-primary/50 transition-all cursor-pointer shadow-sm"
            >
              <option value="all">All Invoices</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="quotation">Quotation</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-(--text-secondary)">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-xl">
        <InvoiceList
          invoices={invoices}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Invoices;
