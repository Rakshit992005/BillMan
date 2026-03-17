import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateCustomerDetails = ({ customer, onClose, onUpdateSuccess }) => {
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    mobile: customer?.mobile || "",
    address: customer?.address || "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setErrorMessage("");

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/customer/update-customer/${id}`,
        formData,
        { withCredentials: true }
      );
      onUpdateSuccess();
      onClose();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update customer details."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const inputClassName = "w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-100 rounded-2xl outline-none transition-all duration-300 font-medium placeholder:text-gray-300 focus:border-primary focus:bg-white focus:shadow-[0_0_20px_rgba(27,103,155,0.1)] focus:ring-4 focus:ring-primary/5";
  const labelClassName = "text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-gray-400 mb-2 block";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Update Customer</h2>
            <p className="text-sm font-bold text-gray-400 mt-1">Modify info for {customer?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl text-sm font-bold bg-red-50 text-red-600 mb-6">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className={labelClassName}>Full Name</label>
              <input
                name="name"
                type="text"
                className={inputClassName}
                value={formData.name}
                onChange={handleChange}
                placeholder="Customer Name"
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Email Address</label>
              <input
                name="email"
                type="email"
                className={inputClassName}
                value={formData.email}
                onChange={handleChange}
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <label className={labelClassName}>Mobile Number</label>
              <input
                name="mobile"
                type="tel"
                className={inputClassName}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
          </div>

          <div>
            <label className={labelClassName}>Customer Address</label>
            <textarea
              name="address"
              className={`${inputClassName} min-h-[120px] resize-none`}
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address..."
              required
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transition-all duration-300 ${
                isUpdating
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-white shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 cursor-pointer"
              }`}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomerDetails;