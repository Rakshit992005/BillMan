import React from "react";
import InvoiceList from "../components/invoices/InvoiceList";

const Invoices = () => {
  // Sample data for demonstration
  const allInvoices = [
    {
      invoiceNumber: "INV-2026-003",
      date: "2026-03-01T00:00:00.000Z",
      totalAmount: 5500,
      status: "paid",
    },
    {
      invoiceNumber: "INV-2026-002",
      date: "2026-02-16T00:00:00.000Z",
      totalAmount: 2000,
      status: "pending",
    },
    {
      invoiceNumber: "INV-2026-001",
      date: "2026-01-10T00:00:00.000Z",
      totalAmount: 12000,
      status: "overdue",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-dark tracking-tight">
            INVOICES
          </h1>
          <p className="text-(--text-secondary) mt-2 italic">
            A comprehensive view of all your billing transactions.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search invoice number..."
              className="pl-12 pr-6 py-3 bg-white border border-primary/30 rounded-full focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-sm min-w-[300px]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="px-8 py-3 bg-dark text-white font-bold rounded-full hover:bg-primary hover:scale-105 active:scale-95 transition-all shadow-xl shadow-dark/20">
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards (Optional for Invoices Page) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Invoices",
            value: "1,234",
            color: "bg-blue-50 text-blue-700",
          },
          {
            label: "Total Revenue",
            value: "₹45,67,890",
            color: "bg-emerald-50 text-emerald-700",
          },
          {
            label: "Pending Collections",
            value: "₹12,34,567",
            color: "bg-amber-50 text-amber-700",
          },
          {
            label: "Overdue Amount",
            value: "₹3,45,678",
            color: "bg-rose-50 text-rose-700",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} p-4 rounded-xl border border-current/10 flex flex-col gap-1`}
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">
              {stat.label}
            </span>
            <span className="text-2xl font-black">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white/40 backdrop-blur-md p-8 rounded-xl border border-primary/10 shadow-sm">
        <h2 className="text-xl font-bold text-dark mb-8 flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg text-sm">
            #
          </span>
          Recent Transactions
        </h2>
        <InvoiceList invoices={allInvoices} />
      </div>
    </div>
  );
};

export default Invoices;
