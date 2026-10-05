import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InvoiceList from "../components/invoices/InvoiceList";
import Graph from "../components/Graph";

const StatCard = ({ title, value, subtitle, icon, colorClass, gradientClass }) => (
  <div className={`p-6 rounded-2xl relative overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 border ${colorClass} bg-white`}>
    <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 blur-2xl ${gradientClass}`} />
    
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-xl ${gradientClass} text-white shadow-sm`}>
        {icon}
      </div>
    </div>
    <div className="space-y-1 relative z-10">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{title}</h3>
      <p className="text-3xl font-black text-gray-800">{value}</p>
      {subtitle && <p className="text-xs font-semibold text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

const DashBoard = () => {
  const [stats, setStats] = useState({
    income: 0,
    pending: 0,
    totalAmount: 0,
    totalInvoices: 0,
    paidInvoicesCount: 0,
    pendingInvoicesCount: 0,
    totalCustomers: 0
  });
  
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [graphRange, setGraphRange] = useState("week");
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, invoicesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard`, { withCredentials: true }),
        axios.get(`${import.meta.env.VITE_BASE_URL}/invoice/status/pending`, { withCredentials: true })
      ]);

      if (statsRes.data?.success) {
        setStats(statsRes.data.data);
      }
      
      if (invoicesRes.data?.invoices) {
        setPendingInvoices(invoicesRes.data.invoices);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await fetchDashboardData();
      setLoading(false);
    };
    initData();
  }, []);

  const handleStatusChange = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/invoice/${id}/paid`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        // Refetch background data smoothly
        fetchDashboardData();
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
          { withCredentials: true }
        );
        if (response.status === 200) {
          fetchDashboardData();
        }
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in text-gray-800">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-indigo-400 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Here's what's happening with your business today.
          </p>
        </div>
        <div>
          <Link
            to="/createinvoice"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Invoice
          </Link>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Income" 
          value={`₹${stats.income.toLocaleString("en-IN")}`}
          subtitle={`${stats.paidInvoicesCount} invoices paid`}
          colorClass="border-emerald-100"
          gradientClass="bg-linear-to-br from-emerald-400 to-emerald-600"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard 
          title="Pending Amount" 
          value={`₹${stats.pending.toLocaleString("en-IN")}`}
          subtitle={`${stats.pendingInvoicesCount} invoices pending`}
          colorClass="border-rose-100"
          gradientClass="bg-linear-to-br from-rose-400 to-rose-600"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard 
          title="Total Billed" 
          value={`₹${stats.totalAmount.toLocaleString("en-IN")}`}
          subtitle={`${stats.totalInvoices} total invoices created`}
          colorClass="border-indigo-100"
          gradientClass="bg-linear-to-br from-indigo-500 to-indigo-700"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
            </svg>
          }
        />
        <StatCard 
          title="Customers" 
          value={stats.totalCustomers}
          colorClass="border-amber-100"
          gradientClass="bg-linear-to-br from-amber-400 to-amber-600"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* GRAPH SECTION */}
        <div className="xl:w-[55%] 2xl:w-2/3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-800">Revenue Analytics</h2>
              <p className="text-sm text-gray-500 font-medium pt-1">Visualize your earnings over time</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Range</label>
              <select 
                value={graphRange} 
                onChange={(e) => setGraphRange(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2 font-bold outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 cursor-pointer transition-all"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
          <div className="grow flex items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 p-4">
            {/* Space left for the graph component */}
            <div className="w-full h-full flex flex-col justify-center items-center">
              <Graph range={graphRange} className="w-full h-full"/>
            </div>
          </div>
        </div>

        {/* PENDING INVOICES SECTION */}
        <div className="xl:w-[45%] 2xl:w-1/3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-800">Pending Invoices</h2>
              <p className="text-sm text-rose-500 font-bold pt-1">
                {stats.pendingInvoicesCount} invoices awaiting payment
              </p>
            </div>
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <div className="grow overflow-y-auto custom-scrollbar pr-2 max-h-[500px]">
            {pendingInvoices.length > 0 ? (
              <div className="space-y-1">
                {/* 
                  Passing only the first 15 so it's not excessively huge, 
                  but allowing the user to scroll to see up to 5 at a time usually 
                  fits nicely in this container limit.
                */}
                <InvoiceList 
                  invoices={pendingInvoices} 
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                <svg className="w-16 h-16 mb-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="font-bold text-gray-500">All caught up!</p>
                <p className="text-sm">No pending invoices found.</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <Link 
              to="/invoices" 
              className="text-indigo-600 font-bold hover:text-indigo-800 text-sm hover:underline transition-all"
            >
              View All Invoices →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
