import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import InvoicePreview from "../components/invoices/InvoicePreview";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const printRef = useRef();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  const location = useLocation();
  const editInvoiceData = location.state?.invoiceData || null;

  // Create a default invoice state or use passed data
  const [invoiceData, setInvoiceData] = useState(
    editInvoiceData || {
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(
        Math.random() * 1000,
      )
        .toString()
        .padStart(3, "0")}`,
      documentType: "Invoice",
      date: new Date().toISOString().substring(0, 10),
      items: [
        {
          id: Date.now(),
          description: "",
          quantity: 1,
          price: 0,
          date: new Date().toISOString().substring(0, 10),
          totalAmount: 0,
        },
      ],
      totalAmount: 0,
      customerId: "",
    },
  );

  useEffect(() => {
    if (editInvoiceData && editInvoiceData.customerId) {
      setSelectedCustomerId(editInvoiceData.customerId);
    }
  }, [editInvoiceData]);

  // Read company data from local storage
  const [companyData, setCompanyData] = useState({});
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      setCompanyData({
        name: user.companyName || "",
        mobile: user.mobile || "",
        address: user.address || "",
        bankName: user.bankDetails?.bankName.toUpperCase() || "",
        branch: user.bankDetails?.branchName.toUpperCase() || "",
        accountNo: user.bankDetails?.accountNumber || "",
        panNumber: user.bankDetails?.panNumber.toUpperCase() || "",
        ifsc: user.bankDetails?.ifscCode.toUpperCase() || "",
        logoUrl: user.logoUrl || "",
        stampUrl: user.stampUrl || "",
      });
    } catch (e) {
      console.error("Error reading local storage", e);
    }
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/customer/get-all-customers/`,
          { withCredentials: true },
        );
        if (response.status === 401) {
          navigate("/login");
        }
        setCustomers(response.data.customers || []);
      } catch (error) {
        console.error("Failed to fetch customers", error);
      }
    };
    fetchCustomers();
  }, [navigate]);

  // Recalculate total whenever items change
  useEffect(() => {
    let newTotal = 0;
    const updatedItems = invoiceData.items.map((item) => {
      const amount =
        (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);
      newTotal += amount;
      return { ...item, totalAmount: amount };
    });

    // Only update if total actually changed to avoid infinite loop
    if (newTotal !== invoiceData.totalAmount) {
      setInvoiceData((prev) => ({
        ...prev,
        items: updatedItems,
        totalAmount: newTotal,
      }));
    }
  }, [invoiceData.items]);

  const handleSelectCustomer = (cid) => {
    setSelectedCustomerId(cid);
    setInvoiceData((prev) => ({ ...prev, customerId: cid }));
    setShowCustomerDropdown(false);

    const cust = customers.find((c) => c._id === cid);
    if (cust) {
      setCustomerSearch(`${cust.name} (${cust.email})`);
    }
  };

  useEffect(() => {
    if (selectedCustomerId && customers.length > 0) {
      const cust = customers.find((c) => c._id === selectedCustomerId);
      if (cust) {
        setCustomerSearch(`${cust.name} (${cust.email})`);
      }
    }
  }, [selectedCustomerId, customers]);

  const filteredCustomers = customers
    .filter(
      (c) =>
        c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(customerSearch.toLowerCase()),
    )
    .slice(0, 4);

  const handleItemChange = (id, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const adItemRow = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now(),
          description: "",
          quantity: 1,
          price: 0,
          date: new Date().toISOString().substring(0, 10),
          totalAmount: 0,
        },
      ],
    }));
  };

  const removeItemRow = (id) => {
    if (invoiceData.items.length === 1) return; // Keep at least one item
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const save = async (payload) =>{
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/invoice/create-invoice`, payload, { withCredentials: true });
        // console.log("invoice saved successfully" , response.data)
      } catch (error) {
        console.error("error occured while saving the invoice" , error)
      }
  }

  // Placeholders for User's Logic
  const handleSave = () => {
    // Format payload to the required structure exactly as user stated
    const payload = {
      invoiceNumber: invoiceData.invoiceNumber,
      documentType: invoiceData.documentType || "Invoice",
      date: new Date(invoiceData.date).toISOString(),
      customerId: invoiceData.customerId,
      items: invoiceData.items.map((item) => ({
        description: item.description,
        quantity: Number(item.quantity),
        price: Number(item.price),
        date: new Date(item.date).toISOString(),
        totalAmount: Number(item.quantity) * Number(item.price),
      })),
      status: invoiceData.documentType === 'Invoice' ? 'pending' : "Quotation",
      totalAmount: invoiceData.totalAmount,
    };

     save(payload)
    // console.log("Saving payload:", payload);
  };

  const handlePrint = () => {
    console.log("Printing invoice...");
    
  };

  const selectedCustomerData =
    customers.find((c) => c._id === selectedCustomerId) || {};

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-(--bg-primary) text-gray-800">
      {/* LEFT PANEL - FORM */}
      <div className="w-1/2 p-8 overflow-y-auto border-r border-gray-200/60 bg-white/80 backdrop-blur-md shadow-xl custom-scrollbar flex flex-col gap-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-indigo-400">
            {editInvoiceData ? "Edit Invoice" : "Create Invoice"}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl font-bold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
            >
              Save
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Print
            </button>
          </div>
        </div>

        {/* Customer Selection Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/80 transition-all hover:shadow-md">
          <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
            Select Customer
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerSearch}
              onChange={(e) => {
                setCustomerSearch(e.target.value);
                setShowCustomerDropdown(true);
                if (e.target.value === "") {
                  setSelectedCustomerId("");
                  setInvoiceData((prev) => ({ ...prev, customerId: "" }));
                }
              }}
              onFocus={() => setShowCustomerDropdown(true)}
              onBlur={() =>
                setTimeout(() => setShowCustomerDropdown(false), 200)
              }
              placeholder="Search name or email..."
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 block p-4 font-medium transition-all"
              required={!selectedCustomerId}
            />
            {showCustomerDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cust) => (
                    <div
                      key={cust._id}
                      onClick={() => handleSelectCustomer(cust._id)}
                      className="p-4 hover:bg-indigo-50/50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                    >
                      <div className="font-bold text-gray-800">{cust.name}</div>
                      <div className="text-xs text-gray-500">{cust.email}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No customers found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Items Form Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/80 flex flex-col gap-4 transition-all hover:shadow-md">
          <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
            Invoice Items
          </label>

          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-3 items-end p-4 bg-gray-50/50 rounded-2xl border border-gray-100 relative group transition-all hover:bg-white hover:border-gray-200 hover:shadow-sm"
              >
                {/* Remove button appears on hover */}
                {invoiceData.items.length > 1 && (
                  <button
                    onClick={() => removeItemRow(item.id)}
                    className="absolute -right-2 -top-2 bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                  >
                    ×
                  </button>
                )}

                <div className="col-span-12 lg:col-span-4">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(item.id, "description", e.target.value)
                    }
                    className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 p-2.5 outline-none font-medium transition-all"
                    placeholder="Item details..."
                  />
                </div>

                <div className="col-span-4 lg:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Qnt
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(item.id, "quantity", e.target.value)
                    }
                    className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 p-2.5 outline-none font-medium transition-all"
                  />
                </div>

                <div className="col-span-4 lg:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(item.id, "price", e.target.value)
                    }
                    className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 p-2.5 outline-none font-medium transition-all"
                  />
                </div>

                <div className="col-span-4 lg:col-span-3">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) =>
                      handleItemChange(item.id, "date", e.target.value)
                    }
                    className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 p-2.5 outline-none font-medium transition-all"
                  />
                </div>

                <div className="col-span-12 lg:col-span-1 flex flex-col justify-end h-full">
                  <div
                    className="text-right font-bold text-indigo-600 mb-2 truncate"
                    title={item.totalAmount}
                  >
                    ₹{item.totalAmount}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={adItemRow}
            className="mt-2 w-full py-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-bold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add Item
          </button>
        </div>

        {/* Invoice configuration (Optional like Date & Inv No, showing here just for clarity) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100/80 flex flex-wrap justify-between gap-4">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Doc Type
            </label>
            <select
              value={invoiceData.documentType || "Invoice"}
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  documentType: e.target.value,
                }))
              }
              className="w-full bg-gray-50 border border-gray-100 text-gray-600 text-sm rounded-lg p-2.5 outline-none font-medium text-center appearance-none"
            >
              <option value="Invoice">Invoice</option>
              <option value="Quotation">Quotation</option>
            </select>
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoiceData.invoiceNumber}
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  invoiceNumber: e.target.value,
                }))
              }
              className="w-full bg-gray-50 border border-gray-100 text-gray-600 text-sm rounded-lg p-2.5 outline-none font-medium text-center"
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Creation Date
            </label>
            <input
              type="date"
              value={invoiceData.date}
              onChange={(e) =>
                setInvoiceData((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-full bg-gray-50 border border-gray-100 text-gray-600 text-sm rounded-lg p-2.5 outline-none font-medium text-center"
            />
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - PREVIEW */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-800/5 backdrop-blur flex justify-center items-start custom-scrollbar">
        {/* Scale wrapper to fit standard A4 width on smaller screens */}
        <div className="origin-top flex justify-center w-full sm:scale-75 lg:scale-[0.85] xl:scale-100 transition-transform">
          <InvoicePreview
            ref={printRef}
            invoiceData={invoiceData}
            customer={selectedCustomerData}
            companyData={
              Object.keys(companyData).length > 0
                ? companyData
                : {
                    name: "MY PREMIUM COMPANY",
                    mobile: "+91 9876543210",
                    address:
                      "42, Business Park, Tech Zone, City, State - 400001",
                    bankName: "HDFC BANK",
                    branch: "Main Branch",
                    accountNo: "09876543211234",
                    ifsc: "HDFC0001234",
                  }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
