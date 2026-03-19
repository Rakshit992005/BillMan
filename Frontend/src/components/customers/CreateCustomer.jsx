import React, { useState } from "react";
import InputField from "../InputField";
import axios from "axios";

const CreateCustomer = ({ onCustomerCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      address: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!formData.name || !formData.address){
        alert("Please fill all the fields");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/customer/create-customer/`,
        formData,
        { withCredentials: true },
      );
      // console.log(response.data);
      if (response.status === 201) {
        handleClear();
        if (onCustomerCreated) onCustomerCreated();
      }
    } catch (error) {
              console.log(error);
    }
  };

  return (
    <div className="p-10 max-w-[1400px] mx-auto space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-[#111827]">Customers</h1>
        <p className="text-[#6B7280] mt-1.5 text-lg font-medium">
          Manage your customer relationships and financial transactions.
        </p>
      </div>

      {/* Create Card */}
      <div className="bg-white rounded-[2rem] border border-gray-100/60 shadow-xl overflow-hidden shadow-gray-200/40">
        <form onSubmit={handleSubmit}>
          {/* Header with Icon */}
          <div className="px-10 py-7 border-b border-gray-50 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#4F46E5] stroke-[2.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <h2 className="text-xl font-bold text-[#111827]">
              Create New Customer
            </h2>
          </div>

          {/* Inputs Row */}
          <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <InputField
              label="Full Name"
              name="name"
              placeholder="e.g. John Smith"
              value={formData.name}
              onChange={handleChange} 
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Mobile Number"
              name="mobile"
              placeholder="+1 (555) 000-0000"
              value={formData.mobile}
              onChange={handleChange}
            />
            <InputField
              label="Physical Address"
              name="address"
              placeholder="City, Country"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Footer Actions */}
          <div className="px-10 py-8 flex items-center justify-end gap-10 mt-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-[15px] font-bold text-gray-500 hover:text-gray-900 transition-colors tracking-wide"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-10 py-4 bg-[#4F46E5] text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-600/30 hover:bg-[#4338CA] transition-all transform active:scale-[0.98]"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
